---
title: "Information Decomposition Shapes Human Reasoning"
collection: publications
category: conferences
permalink: /publication/2026-06-01-information-decomposition-human-reasoning
excerpt: 'The contents above will be part of a list of publications, if the user clicks the link for the publication than the contents of section will be rendered as a full page, allowing you to provide more information about the paper for the reader. When publications are displayed as a single page, the contents of the above "citation" field will automatically be included below this section in a smaller font.'
date: 2026-06-01
venue: 'conference'
authors: '<strong>M. Emre Bilgin </strong>'
tldr: 'This study examines whether people, when making decisions under uncertainty, are sensitive not only to the question “How much evidence is there?” but also to how the evidence is organized. Initial pilot findings suggest that redundant information is utilized more directly, while synergistic information is more difficult to process but becomes actionable once connections are established. In short: What matters in reasoning is not just the amount of information, but its architecture.'
paperurl: 'https://academicpages.github.io/files/paper3.pdf'
arxiv: 'x.com/itsmebilgin'
github: 'x.com/itsmebilgin'
website: 'x.com/itsmebilgin'
citation: 'Bilgin, D. (2024). "Information Decomposition Shapes Human Reasoning" `<i>`conference `</i>`.'
---

## Read the paper

- Paper: [arXiv link coming soon](#)
- Code and data: [GitHub link coming soon](#)
- Figures and benchmark materials: [Project page coming soon](#)

If you are interested in LLM evaluation, Bayesian reasoning, cognitive science, or process-level supervision, I would be happy to discuss.

## Introduction

When making a decision, we usually ask: How much evidence is there?

But perhaps there is another question that is just as important:

How is the evidence organized?

This is the fundamental question I ask in this study. When people update their beliefs under uncertainty, are they sensitive only to the amount of evidence, or do they also take into account the information architecture of the evidence?

To test this, I compared two different information structures: redundant and synergistic information.

In the redundant case, each clue is meaningful on its own. Both clues carry separate information about the target. We can think of this like two witnesses testifying in the same direction: each one says something on their own.

In the synergistic case, however, individual clues don’t carry much meaning on their own. The actual information emerges when the two clues are evaluated together. This is more like a two-part code: the first part is insufficient on its own; the meaning is formed when combined with the second part.

In the experiment, participants predicted which of two possible systems was active in each trial. First, they saw the first clue and estimated the likelihood of System A. Then they saw the second clue and updated their predictions.

Preliminary findings reveal a rather interesting pattern.

In a redundant information structure, participants react strongly to the first clue. That is, when the clue carries information on its own, people quickly adjust their predictions in that direction. This is an expected result: when information is directly readable, the update is also direct.

In the synergistic information structure, however, the story is different. Since the first clue does not carry much information on its own, the ideal observer should not make a significant update. In the pilot data, participants do not remain completely static after the first clue, but the main divergence emerges after the second clue arrives. In other words, when information emerges not in individual cues but in the relationships between them, people seem to grasp it more slowly but still partially.

The most important aspect of these results is this:

Human reasoning may not be merely a process of gathering evidence. People may also be sensitive to how evidence is structured.

This distinction is particularly important when comparing artificial intelligence and human reasoning. Because many reasoning problems do not merely require “more information”; they require the right pieces of information to be combined within the right architecture. Some problems have a redundant structure: there are multiple clues leading to the same conclusion. Others have a synergistic structure: the solution emerges only when the parts are considered together.

The findings in this article are not final conclusions. For now, these should be viewed as early/pilot signals. Larger samples, more detailed modeling, and participant-level analyses are necessary.

But the initial picture suggests this:

What matters in reasoning is not just what we know; it is how what we know is connected.
