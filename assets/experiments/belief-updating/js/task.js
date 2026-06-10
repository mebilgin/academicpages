import { CONFIG } from "./config.js";
import { startFirebaseSession, saveExperimentData } from "./firebase-client.js";

const app = document.getElementById("app");
const state = {
  participantId: crypto.randomUUID(),
  sessionId: crypto.randomUUID(),
  consentGiven: false,
  architectureOrder: shuffle([...CONFIG.architectures]),
  priorType: Math.random() < 0.5 ? "explicit" : "implicit",
  currentBlockIndex: 0,
  currentTrialIndex: 0,
  trialList: [],
  currentSliderValue: CONFIG.sliderStart,
  sliderMoved: false,
  stage1Response: null,
  rawEvents: [],
  trials: [],
  stageResponses: [],
  finalChoices: [],
  confidenceResponses: [],
  priorReports: [],
  postTaskResponses: [],
  qualityEvents: [],
  startedAt: Date.now(),
  firebase: {
    started: false,
    saved: false,
    error: null,
    uid: null
  }
};

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a }
function logit(p) { const e = 1e-6, x = Math.min(1 - e, Math.max(e, p)); return Math.log(x / (1 - x)) }
function invLogit(x) { return 1 / (1 + Math.exp(-x)) }
function llr(a, b) { return Math.log(a / b) }
function pct(x) { return `${Math.round(x * 100)}%` }
function now() { return new Date().toISOString() }
function logEvent(event_type, payload = {}) { state.rawEvents.push({ event_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, event_type, event_index: state.rawEvents.length + 1, client_timestamp: now(), client_elapsed_ms: Date.now() - state.startedAt, block_index: state.currentBlockIndex, trial_index: state.currentTrialIndex, payload, experiment_version: CONFIG.experimentVersion }) }
function currentTrial() { return state.trialList[state.currentTrialIndex] }
function progress() { return Math.min(100, Math.round((state.currentTrialIndex / (state.trialList.length || 1)) * 100)) }
function render(html) { app.innerHTML = `<section class="card"><div class="topbar"><span>Sürüm: ${CONFIG.experimentVersion}</span><span>Katılımcı: ${state.participantId.slice(0, 8)}</span></div><div class="progress-wrap"><div class="progress-bar" style="width:${progress()}%"></div></div>${html}</section>` }

function generateTrials() {
  let global = 1, out = [];
  state.architectureOrder.forEach((architecture, b) => {
    const patterns = architecture === "joint_cue_diagnostic" ? ["same_A", "diff_B", "same_A", "diff_B"] : ["A_A", "A_B", "B_A", "B_B"];
    shuffle(patterns).forEach((pattern, i) => out.push(buildTrial(architecture, b + 1, i + 1, global++, pattern)));
  });
  state.trialList = out;
}

function buildTrial(architecture, blockIndex, trialIndexBlock, trialIndexGlobal, pattern) {
  const priorA = CONFIG.priorProbabilityA, trueState = Math.random() < priorA ? "A" : "B";
  let cue1Value, cue2Value, L;
  if (architecture === "single_cue_diagnostic") {
    const c1 = pattern[0] === "A", c2 = pattern[2] === "A";
    cue1Value = c1 ? "Mavi" : "Turuncu"; cue2Value = c2 ? "Üçgen" : "Daire";
    L = { p1A: c1 ? .75 : .25, p1B: c1 ? .25 : .75, pjA: (c1 ? .75 : .25) * (c2 ? .75 : .25), pjB: (c1 ? .25 : .75) * (c2 ? .25 : .75) };
  } else {
    const same = pattern === "same_A";
    if (same) { const opt = Math.random() < .5; cue1Value = opt ? "Mavi" : "Turuncu"; cue2Value = opt ? "Üçgen" : "Daire" }
    else { const opt = Math.random() < .5; cue1Value = opt ? "Mavi" : "Turuncu"; cue2Value = opt ? "Daire" : "Üçgen" }
    L = { p1A: .5, p1B: .5, pjA: same ? .8 : .2, pjB: same ? .2 : .8 };
  }
  const priorLogOdds = logit(priorA), cue1Llr = llr(L.p1A, L.p1B), jointLlr = llr(L.pjA, L.pjB);
  const s1 = priorLogOdds + cue1Llr, s2 = priorLogOdds + jointLlr;
  return { trial_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, block_id: `block_${blockIndex}`, block_index: blockIndex, trial_index_global: trialIndexGlobal, trial_index_block: trialIndexBlock, trial_type: "main", architecture, prior_type: state.priorType, true_state: trueState, prior_probability_A: priorA, prior_log_odds_A: priorLogOdds, cue1_dimension: "color", cue1_value: cue1Value, cue2_dimension: "shape", cue2_value: cue2Value, cue_pattern: pattern, likelihood_cue1_given_A: L.p1A, likelihood_cue1_given_B: L.p1B, likelihood_joint_given_A: L.pjA, likelihood_joint_given_B: L.pjB, cue1_llr: cue1Llr, joint_llr: jointLlr, cue2_incremental_llr: jointLlr - cue1Llr, normative_stage1_prob_A: invLogit(s1), normative_stage2_prob_A: invLogit(s2), normative_stage1_logit_A: s1, normative_stage2_logit_A: s2, is_confidence_trial: trialIndexGlobal % CONFIG.confidenceEveryNTrials === 0, is_prior_report_due_after: trialIndexGlobal % CONFIG.priorReportEveryNTrials === 0, feedback_shown: true };
}

function cueCard(label, value, empty = false) {
  const sym = value === "Mavi" || value === "Turuncu" ? "■" : value === "Üçgen" ? "▲" : value === "Daire" ? "●" : "?";
  const color = value === "Mavi" ? "#2563eb" : value === "Turuncu" ? "#f97316" : "#0f172a";
  return `<div class="cue-card ${empty ? "empty-cue" : ""}"><div class="cue-label">${label}</div><div class="cue-value">${value || "Bekleniyor"}</div><div class="cue-symbol" style="color:${color}">${empty ? "?" : sym}</div></div>`;
}
function sliderBox(question, startValue = CONFIG.sliderStart) {
  state.currentSliderValue = startValue;
  return `<div class="slider-box"><h3>${question}</h3><div class="slider-value"><span id="sliderVal">${startValue}</span>%</div><input id="posteriorSlider" type="range" min="0" max="100" value="${startValue}"/><div class="slider-labels"><span>0% = kesin B</span><span>50% = eşit</span><span>100% = kesin A</span></div><div class="button-row"><button id="submitSliderBtn" disabled>Kaydet</button></div></div>`;
}
function setupSlider(onSubmit) {
  const s = document.getElementById("posteriorSlider"), v = document.getElementById("sliderVal"), b = document.getElementById("submitSliderBtn");
  state.sliderMoved = false;
  s.oninput = () => { state.currentSliderValue = Number(s.value); v.textContent = state.currentSliderValue; state.sliderMoved = true; b.disabled = false };
  b.onclick = onSubmit;
}

function showConsent() {
  render(`<h1>Bilgi Mimarisi ve İnanç Güncelleme Deneyi</h1><p>Bu prototipte iki gizli sistemden hangisinin aktif olduğunu tahmin edeceksin. Her denemede iki sensör sinyali görecek ve her sinyalden sonra Sistem A'nın aktif olma olasılığını tahmin edeceksin.</p><p class="muted">Bu sürüm Firebase'siz Jekyll prototipidir. Veriler deney sonunda JSON olarak indirilebilir.</p><div class="pill-row"><span class="pill">Stage-based posterior</span><span class="pill">Single-cue vs joint-cue</span><span class="pill">Yerel JSON kayıt</span></div><div class="button-row"><button id="go">Onaylıyorum ve başla</button></div>`);
  document.getElementById("go").onclick = async () => { const btn = document.getElementById("go"); btn.disabled = true; btn.textContent = "Firebase oturumu başlatılıyor..."; state.consentGiven = true; logEvent("consent_given", { consent_given: true }); try { const fb = await startFirebaseSession({ config: CONFIG, participantId: state.participantId, sessionId: state.sessionId, clientInfo: getClientInfo() }); state.firebase.started = true; state.firebase.uid = fb.uid; logEvent("firebase_session_started", { uid: fb.uid }) } catch (err) { state.firebase.error = String(err?.message || err); logEvent("firebase_session_error", { error: state.firebase.error }); alert("Firebase bağlantısı kurulamadı. Deney yine çalışacak; sonunda JSON indirebilirsin. Hata: " + state.firebase.error) } generateTrials(); showInstructions() };
}
function showInstructions() {
  const prior = state.priorType === "explicit" ? `<p><strong>Bu oturumda Sistem A genel olarak daha sık aktiftir:</strong> yaklaşık ${pct(CONFIG.priorProbabilityA)} Sistem A, ${pct(1 - CONFIG.priorProbabilityA)} Sistem B.</p>` : `<p>Bu oturumda Sistem A ve B'nin ne kadar sık aktif olduğunu sana açıkça söylemeyeceğiz. Geri bildirimlerden öğrenmeye çalış.</p>`;
  render(`<h2>Görev Talimatı</h2><p>Her denemede gizli sistem ya <strong>Sistem A</strong> ya da <strong>Sistem B</strong> olacak. İki sensörden gelen ipuçlarını sırayla göreceksin.</p>${prior}<ol><li>İlk sensör sinyalini gör.</li><li>Sistem A olasılığını 0-100 arasında tahmin et.</li><li>İkinci sensör sinyalini gör.</li><li>Olasılığını yeniden güncelle.</li><li>Son kararını ver ve geri bildirim al.</li></ol><p class="muted">Her blokta sensörlerin çalışma biçimi farklı olabilir.</p><div class="button-row"><button id="start">Deneye başla</button></div>`);
  document.getElementById("start").onclick = () => { logEvent("instructions_completed", { prior_type: state.priorType, architecture_order: state.architectureOrder }); showBlockIntro() };
}
function showBlockIntro() {
  const arch = state.architectureOrder[state.currentBlockIndex];
  render(`<h2>${CONFIG.labels[arch]} başlıyor</h2><p>Bu blokta sensörlerin çalışma biçimi önceki bloktan farklı olabilir. Geri bildirimleri kullanarak öğrenmeye çalış.</p><p class="muted">Ana sürümde familiarization ve geçme kriterleri eklenecek.</p><div class="button-row"><button id="blockStart">Bloğa başla</button></div>`);
  document.getElementById("blockStart").onclick = () => { logEvent("block_started", { architecture: arch, block_index: state.currentBlockIndex + 1 }); showStage1() };
}
function showStage1() {
  const t = currentTrial(), start = Date.now();
  logEvent("trial_started", { trial_id: t.trial_id, architecture: t.architecture }); logEvent("cue_presented", { trial_id: t.trial_id, stage: 1, cue1_value: t.cue1_value });
  render(`<h2>Deneme ${t.trial_index_block} / ${CONFIG.trialsPerArchitecture}</h2><p class="muted">${CONFIG.labels[t.architecture]} · ${state.priorType === "explicit" ? `Temel oran: Sistem A ${pct(CONFIG.priorProbabilityA)}` : "Temel oran açıkça verilmedi"}</p><div class="cue-grid">${cueCard("Sensör 1", t.cue1_value)}${cueCard("Sensör 2", null, true)}</div>${sliderBox("İlk ipucundan sonra Sistem A'nın aktif olma olasılığı sence kaçtır?")}`);
  setupSlider(() => { const resp = state.currentSliderValue / 100; state.stage1Response = resp; const row = stageRow(t, 1, resp, start, CONFIG.sliderStart, t.normative_stage1_prob_A, t.normative_stage1_logit_A); state.stageResponses.push(row); logEvent("posterior_submitted", row); showStage2() });
}
function showStage2() {
  const t = currentTrial(), start = Date.now(), initial = Math.round(state.stage1Response * 100);
  logEvent("cue_presented", { trial_id: t.trial_id, stage: 2, cue2_value: t.cue2_value });
  render(`<h2>Deneme ${t.trial_index_block} / ${CONFIG.trialsPerArchitecture}</h2><p class="muted">Şimdi iki sensörü birlikte düşün.</p><div class="cue-grid">${cueCard("Sensör 1", t.cue1_value)}${cueCard("Sensör 2", t.cue2_value)}</div>${sliderBox("İki ipucundan sonra Sistem A'nın aktif olma olasılığı sence kaçtır?", initial)}`);
  setupSlider(() => { const resp = state.currentSliderValue / 100; const row = stageRow(t, 2, resp, start, initial, t.normative_stage2_prob_A, t.normative_stage2_logit_A); row.update_from_previous_stage = resp - state.stage1Response; state.stageResponses.push(row); logEvent("posterior_submitted", row); showChoice() });
}
function stageRow(t, stage, resp, start, initial, normProb, normLogit) { return { stage_response_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, block_id: t.block_id, trial_id: t.trial_id, stage, architecture: t.architecture, prior_type: state.priorType, response_prob_A: resp, response_percent_A: state.currentSliderValue, response_logit_A: logit(resp), slider_initial_value: initial, slider_moved: state.sliderMoved, rt_ms: Date.now() - start, normative_prob_A: normProb, normative_logit_A: normLogit, signed_error_prob: resp - normProb, abs_error_prob: Math.abs(resp - normProb), submitted_at: now(), missing: false } }
function showChoice() {
  const t = currentTrial(); const start = Date.now();
  render(`<h2>Son karar</h2><p>Bu denemede hangi sistemin aktif olduğunu düşünüyorsun?</p><div class="cue-grid">${cueCard("Sensör 1", t.cue1_value)}${cueCard("Sensör 2", t.cue2_value)}</div><div class="choice-grid"><button class="choice-button" id="a">Sistem A</button><button class="choice-button" id="b">Sistem B</button></div>`);
  const submit = (choice) => { const correct = choice === t.true_state; const row = { choice_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, block_id: t.block_id, trial_id: t.trial_id, choice, correct, rt_ms: Date.now() - start, normative_choice: t.normative_stage2_prob_A >= .5 ? "A" : "B", submitted_at: now(), missing: false }; state.finalChoices.push(row); state.trials.push({ ...t, trial_completed_at: now() }); logEvent("final_choice_submitted", row); t.is_confidence_trial ? showConfidence() : showFeedback() };
  document.getElementById("a").onclick = () => submit("A"); document.getElementById("b").onclick = () => submit("B");
}
function showConfidence() {
  const t = currentTrial(), start = Date.now();
  render(`<h2>Güven derecesi</h2><p>Son kararından ne kadar eminsin?</p>${sliderBox("Güven dereceni belirt.", 50)}`);
  setupSlider(() => { const latest = state.finalChoices.at(-1); const row = { confidence_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, block_id: t.block_id, trial_id: t.trial_id, confidence_percent: state.currentSliderValue, confidence_prob: state.currentSliderValue / 100, rt_ms: Date.now() - start, final_choice: latest.choice, correct: latest.correct, submitted_at: now(), missing: false }; state.confidenceResponses.push(row); logEvent("confidence_submitted", row); showFeedback() });
}
function showFeedback() {
  const t = currentTrial(), latest = state.finalChoices.at(-1), cls = latest.correct ? "correct" : "wrong", msg = latest.correct ? "Doğru" : "Yanlış";
  logEvent("feedback_shown", { trial_id: t.trial_id, true_state: t.true_state, correct: latest.correct });
  render(`<h2>Geri bildirim</h2><div class="feedback ${cls}"><h3>${msg}</h3><p>Doğru sistem: <strong>Sistem ${t.true_state}</strong></p><p>Senin kararın: <strong>Sistem ${latest.choice}</strong></p></div><div class="small-grid"><div class="metric">Normatif Stage 1<strong>${pct(t.normative_stage1_prob_A)}</strong></div><div class="metric">Normatif Stage 2<strong>${pct(t.normative_stage2_prob_A)}</strong></div><div class="metric">Architecture<strong>${t.architecture.replaceAll("_", " ")}</strong></div></div><div class="button-row"><button id="next">Devam et</button></div>`);
  document.getElementById("next").onclick = () => t.is_prior_report_due_after ? showPriorReport() : nextTrialOrBlock();
}
function showPriorReport() {
  const t = currentTrial(), start = Date.now();
  render(`<h2>Genel oran tahmini</h2><p>Şu ana kadarki deneyimine göre, bu blokta Sistem A ne kadar sık aktif oluyor?</p>${sliderBox("Sistem A'nın genel oranını tahmin et.", CONFIG.sliderStart)}`);
  setupSlider(() => { const done = state.trials.filter(x => x.block_id === t.block_id), freq = done.filter(x => x.true_state === "A").length / Math.max(1, done.length); const row = { prior_report_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, block_id: t.block_id, after_trial_id: t.trial_id, report_index: state.priorReports.length + 1, report_phase: "periodic", reported_prob_A: state.currentSliderValue / 100, reported_percent_A: state.currentSliderValue, reported_logit_A: logit(state.currentSliderValue / 100), generative_prior_A: CONFIG.priorProbabilityA, experienced_frequency_A_so_far: freq, feedback_count_so_far: done.length, rt_ms: Date.now() - start, submitted_at: now(), missing: false }; state.priorReports.push(row); logEvent("prior_report_submitted", row); nextTrialOrBlock() });
}
function nextTrialOrBlock() { state.currentTrialIndex++; const nxt = currentTrial(); if (!nxt) { showPostTask(); return } if (nxt.block_index !== state.currentBlockIndex + 1) { logEvent("block_completed", { block_index: state.currentBlockIndex + 1 }); state.currentBlockIndex++; showBlockIntro() } else showStage1() }
function showPostTask() { render(`<h2>Son sorular</h2><p>Görev boyunca nasıl karar verdiğini birkaç cümleyle açıklar mısın?</p><textarea id="strategyText" placeholder="Örn. İlk sensöre dikkat ettim, iki sensörün kombinasyonunu takip ettim, belirli bir kural fark ettim..."></textarea><div class="button-row"><button id="finish">Deneyi bitir</button></div>`); document.getElementById("finish").onclick = () => { const response = document.getElementById("strategyText").value.trim(); const row = { post_task_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, question_id: "strategy_open_text", response_type: "text", response_text: response, submitted_at: now() }; state.postTaskResponses.push(row); logEvent("post_task_response_submitted", row); logEvent("session_completed", { total_duration_ms: Date.now() - state.startedAt }); showEnd() } }
function buildExport() { return { metadata: { study_id: CONFIG.studyId, experiment_version: CONFIG.experimentVersion, participant_id: state.participantId, session_id: state.sessionId, prior_type: state.priorType, architecture_order: state.architectureOrder, started_at: new Date(state.startedAt).toISOString(), exported_at: now() }, participants: [{ participant_id: state.participantId, consent_given: state.consentGiven, prior_type: state.priorType, architecture_order: state.architectureOrder.join("__"), experiment_version: CONFIG.experimentVersion }], trials: state.trials, stage_responses: state.stageResponses, final_choices: state.finalChoices, confidence_responses: state.confidenceResponses, prior_reports: state.priorReports, post_task_responses: state.postTaskResponses, quality_events: state.qualityEvents, raw_events: state.rawEvents } }
function downloadJson() { const blob = new Blob([JSON.stringify(buildExport(), null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `belief_updating_${state.participantId.slice(0, 8)}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url) }
function getClientInfo() { return { user_agent: navigator.userAgent, language: navigator.language, platform: navigator.platform, screen_width: window.screen?.width, screen_height: window.screen?.height, viewport_width: window.innerWidth, viewport_height: window.innerHeight, device_pixel_ratio: window.devicePixelRatio, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone } }
async function saveToFirebase() { const btn = document.getElementById("saveFirebase"); if (btn) { btn.disabled = true; btn.textContent = "Firebase'e kaydediliyor..." } try { const result = await saveExperimentData(buildExport()); state.firebase.saved = true; logEvent("firebase_data_saved", result); if (btn) { btn.textContent = "Firebase'e kaydedildi" } alert(`Firebase'e kaydedildi. Yazılan kayıt sayısı: ${result.committed}`) } catch (err) { state.firebase.error = String(err?.message || err); logEvent("firebase_save_error", { error: state.firebase.error }); if (btn) { btn.disabled = false; btn.textContent = "Firebase'e tekrar kaydet" } alert("Firebase'e kaydetme başarısız: " + state.firebase.error) } }

function showEnd() { const acc = state.finalChoices.filter(x => x.correct).length / Math.max(1, state.finalChoices.length); render(`<h2>Teşekkürler</h2><p>Prototipi tamamladın. Bu pilot sürümde veriyi Firebase'e kaydedebilir ve ayrıca JSON yedek çıktısı indirebilirsin.</p><div class="small-grid"><div class="metric">Trial sayısı<strong>${state.finalChoices.length}</strong></div><div class="metric">Doğruluk<strong>${pct(acc)}</strong></div><div class="metric">Posterior yanıtı<strong>${state.stageResponses.length}</strong></div></div><div class="button-row"><button id="saveFirebase">Firebase'e kaydet</button><button id="download">JSON verisini indir</button><button class="secondary" id="restart">Yeniden başlat</button></div>`); document.getElementById("saveFirebase").onclick = saveToFirebase; document.getElementById("download").onclick = downloadJson; document.getElementById("restart").onclick = () => location.reload() }
window.addEventListener("blur", () => { state.qualityEvents.push({ quality_event_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, event_type: "focus_lost", event_started_at: now(), client_elapsed_ms: Date.now() - state.startedAt }); logEvent("focus_lost") });
document.addEventListener("visibilitychange", () => { const event_type = document.hidden ? "visibility_hidden" : "visibility_visible"; state.qualityEvents.push({ quality_event_id: crypto.randomUUID(), participant_id: state.participantId, session_id: state.sessionId, event_type, event_started_at: now(), client_elapsed_ms: Date.now() - state.startedAt }); logEvent(event_type) });
showConsent();
