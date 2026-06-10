export const CONFIG = {
  studyId: "belief_architecture_v1",
  experimentVersion: "0.2.0-firebase-pilot",
  studyPhase: "firebase_pilot",
  priorProbabilityA: 0.70,
  trialsPerArchitecture: 4,
  confidenceEveryNTrials: 3,
  priorReportEveryNTrials: 4,
  sliderStart: 50,
  architectures: ["single_cue_diagnostic", "joint_cue_diagnostic"],
  labels: {
    single_cue_diagnostic: "Blok 1",
    joint_cue_diagnostic: "Blok 2"
  }
};
