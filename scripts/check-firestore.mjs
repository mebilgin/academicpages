import admin from "firebase-admin";

admin.initializeApp({
  projectId: "thesis-bayes"
});

const db = admin.firestore();
const studyId = "belief_architecture_v1";

async function main() {
  const participantsSnap = await db
    .collection("studies")
    .doc(studyId)
    .collection("participants")
    .limit(10)
    .get();

  const sessionsSnap = await db
    .collection("studies")
    .doc(studyId)
    .collection("sessions")
    .limit(10)
    .get();

  console.log(`Study: ${studyId}`);
  console.log(`Participants shown: ${participantsSnap.size}`);
  console.log(`Sessions shown: ${sessionsSnap.size}`);

  for (const doc of sessionsSnap.docs) {
    const sessionId = doc.id;
    const session = doc.data();

    const trials = await db.collection("studies").doc(studyId)
      .collection("sessions").doc(sessionId)
      .collection("trials").count().get();

    const stages = await db.collection("studies").doc(studyId)
      .collection("sessions").doc(sessionId)
      .collection("stage_responses").count().get();

    const choices = await db.collection("studies").doc(studyId)
      .collection("sessions").doc(sessionId)
      .collection("final_choices").count().get();

    const raw = await db.collection("studies").doc(studyId)
      .collection("sessions").doc(sessionId)
      .collection("raw_events").count().get();

    console.log("\nSession:", sessionId);
    console.log("  participant:", session.participant_id);
    console.log("  status:", session.status);
    console.log("  version:", session.experiment_version);
    console.log("  trials:", trials.data().count);
    console.log("  stage_responses:", stages.data().count);
    console.log("  final_choices:", choices.data().count);
    console.log("  raw_events:", raw.data().count);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
