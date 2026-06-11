import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  doc,
  collection,
  writeBatch,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let authUser = null;

function exportLanguage(exportData) {
  return exportData?.metadata?.lang || exportData?.metadata?.language || "unknown";
}

export async function startFirebaseSession({ config, participantId, sessionId, lang = "unknown", clientInfo = {} }) {
  const credential = await signInAnonymously(auth);
  authUser = credential.user;

  const participantRef = doc(db, "studies", config.studyId, "participants", participantId);
  const sessionRef = doc(db, "studies", config.studyId, "sessions", sessionId);

  const batch = writeBatch(db);
  batch.set(participantRef, {
    participant_id: participantId,
    firebase_uid: authUser.uid,
    study_id: config.studyId,
    study_phase: config.studyPhase,
    experiment_version: config.experimentVersion,
    lang,
    created_at: serverTimestamp(),
    client_info: clientInfo
  }, { merge: true });

  batch.set(sessionRef, {
    session_id: sessionId,
    participant_id: participantId,
    firebase_uid: authUser.uid,
    study_id: config.studyId,
    study_phase: config.studyPhase,
    experiment_version: config.experimentVersion,
    lang,
    status: "started",
    started_at: serverTimestamp(),
    client_info: clientInfo
  }, { merge: true });

  await batch.commit();

  return {
    uid: authUser.uid,
    participantId,
    sessionId
  };
}

function safeDocId(prefix, index) {
  return `${prefix}_${String(index + 1).padStart(5, "0")}`;
}

function rowDocId(collectionName, row, index) {
  const idByCollection = {
    trials: row.trial_id,
    stage_responses: row.stage_response_id,
    final_choices: row.choice_id,
    confidence_responses: row.confidence_id,
    prior_reports: row.prior_report_id,
    post_task_responses: row.post_task_id,
    quality_events: row.quality_event_id,
    raw_events: row.event_id
  };

  return String(idByCollection[collectionName] || safeDocId(collectionName, index));
}

async function commitChunks(writeFns, chunkSize = 450) {
  let committed = 0;
  for (let i = 0; i < writeFns.length; i += chunkSize) {
    const batch = writeBatch(db);
    for (const fn of writeFns.slice(i, i + chunkSize)) {
      fn(batch);
    }
    await batch.commit();
    committed += Math.min(chunkSize, writeFns.length - i);
  }
  return committed;
}

export async function saveExperimentData(exportData) {
  if (!auth.currentUser) {
    const credential = await signInAnonymously(auth);
    authUser = credential.user;
  }

  const { metadata } = exportData;
  const studyId = metadata.study_id;
  const participantId = metadata.participant_id;
  const sessionId = metadata.session_id;
  const lang = exportLanguage(exportData);

  const sessionRef = doc(db, "studies", studyId, "sessions", sessionId);
  const writeFns = [];

  writeFns.push((batch) => batch.set(sessionRef, {
    status: "completed",
    lang,
    completed_at: serverTimestamp(),
    metadata,
    firebase_uid: auth.currentUser.uid
  }, { merge: true }));

  const collectionMap = [
    ["trials", exportData.trials || []],
    ["stage_responses", exportData.stage_responses || []],
    ["final_choices", exportData.final_choices || []],
    ["confidence_responses", exportData.confidence_responses || []],
    ["prior_reports", exportData.prior_reports || []],
    ["post_task_responses", exportData.post_task_responses || []],
    ["quality_events", exportData.quality_events || []],
    ["raw_events", exportData.raw_events || []]
  ];

  for (const [name, rows] of collectionMap) {
    rows.forEach((row, idx) => {
      const id = rowDocId(name, row, idx);

      writeFns.push((batch) => {
        const ref = doc(collection(db, "studies", studyId, "sessions", sessionId, name), String(id));
        batch.set(ref, {
          ...row,
          participant_id: participantId,
          session_id: sessionId,
          lang: row.lang || lang,
          firebase_uid: auth.currentUser.uid,
          saved_at: serverTimestamp()
        }, { merge: true });
      });
    });
  }

  const committed = await commitChunks(writeFns);

  return {
    ok: true,
    committed,
    studyId,
    participantId,
    sessionId
  };
}
