---
title: "Query-Conditioned Active Causal World Models for Language
Agents"
collection: publications
category: conferences
permalink: /publication/2026-05-11-active-causal-world-model
excerpt: 'The contents above will be part of a list of publications, if the user clicks the link for the publication than the contents of section will be rendered as a full page, allowing you to provide more information about the paper for the reader. When publications are displayed as a single page, the contents of the above "citation" field will automatically be included below this section in a smaller font.'
date: 2026-05-11
venue: 'conference'
authors: '<strong>M. Emre Bilgin</strong>'
tldr: 'LLM agents should not answer causal questions immediately when the necessary evidence is missing. We propose a query-conditioned causal agent that first asks: Do I have enough evidence to answer this specific causal question? If not, it selects the most useful next action—observe, intervene, retrieve, ask, or simulate—to reduce uncertainty about the target answer. The goal is not to learn the whole causal graph, but to gather just enough causal evidence to answer well.'
paperurl: 'https://academicpages.github.io/files/paper3.pdf'
arxiv: 'x.com/itsmebilgin'
github: 'x.com/itsmebilgin'
website: 'x.com/itsmebilgin'
citation: 'Bilgin, D. (2024). "Beyond Final Answers: Information-Architecture Blindness in LLM Belief Updating" `<i>`conference `</i>`.'
---

Read the paper

- Paper: [arXiv link coming soon](#)
- Code and data: [GitHub link coming soon](#)
- Figures and benchmark materials: [Project page coming soon](#)

If you are interested in LLM evaluation, Bayesian reasoning, cognitive science, or process-level supervision, I would be happy to discuss.

## Introduction

Most LLM agents treat causal questions like ordinary questions: they produce an answer.

But in causal reasoning, answering immediately is often the wrong behavior.

A user may ask:

> Would the outcome have changed if we had intervened earlier?

A good agent should not simply generate a plausible causal explanation. It should first ask a more important question:

> Do I have enough evidence to answer this causal query?

If not, the agent should know what to do next: observe a missing variable, retrieve relevant evidence, ask a clarification question, simulate a counterfactual, or recommend an intervention.

In our new work, we study exactly this problem.

## The problem: causal agents answer too early

Current LLM agents can produce fluent causal explanations, but they often lack an explicit model of causal uncertainty.

This creates a serious failure mode.

The agent may answer even when:

* the decisive evidence is missing,
* multiple causal hypotheses are still possible,
* the query depends on a counterfactual,
* the relevant confounder has not been observed,
* or the full causal graph is uncertain.

In these cases, the problem is not just whether the final answer sounds reasonable.

The problem is that the agent does not know whether it is ready to answer.

For causal reasoning, this matters. A causally competent agent should be able to distinguish between three situations:

1. I can answer now.
2. I need more evidence.
3. I know which evidence would be most useful.

## What we propose

We propose **Query-Conditioned Active Causal World Models** for language agents.

The key idea is simple:

> The agent should seek evidence that is useful for the current causal question, not evidence that reconstructs the entire causal graph.

Many causal discovery methods try to learn the full causal structure. But users usually do not ask for the full graph. They ask a specific causal question.

For example:

> Did treatment X cause recovery Y?

To answer this, the agent may not need to know every causal relationship in the environment. It only needs the evidence that reduces uncertainty about this particular query.

This shifts the objective from full graph discovery to **causal answer efficiency**.

## How the approach works

The agent maintains uncertainty over possible causal explanations and over the target answer.

Given a causal query, it considers several possible actions:

| Action                   | Purpose                                |
| ------------------------ | -------------------------------------- |
| Observe a variable       | Check missing evidence                 |
| Intervene                | Test a causal effect                   |
| Retrieve evidence        | Bring in external information          |
| Ask clarification        | Resolve ambiguity in the query         |
| Simulate counterfactuals | Explore possible outcomes              |
| Answer now               | Respond when uncertainty is low enough |

At each step, the agent estimates which action would most reduce uncertainty about the target causal answer.

The LLM handles the language side: parsing the user’s question, grounding entities into variables, proposing candidate actions, and explaining the final answer.

The causal module handles the reasoning side: maintaining causal uncertainty, scoring evidence actions, updating beliefs, and deciding whether the agent should answer or continue seeking evidence.

This separation is important.

The goal is not to make the LLM “sound causal.”
The goal is to give the agent a formal mechanism for deciding what causal evidence it still needs.

## Why this matters

Causal reasoning is not only about producing explanations.

It is also about knowing what would change your answer.

A model that answers immediately may look helpful, but it can be dangerous when the causal question is underdetermined. In scientific discovery, diagnosis, policy analysis, product analytics, robotics, or decision support, the right next step is often not an answer.

It is an evidence-seeking action.

Our central claim is:

> A causal language agent should optimize for the evidence needed to answer the current query, rather than trying to learn everything about the world before responding.

This makes causal reasoning more selective, more uncertainty-aware, and more cost-efficient.

## What we evaluate

We evaluate whether query-conditioned evidence acquisition helps agents answer causal questions with:

* higher answer accuracy,
* better uncertainty calibration,
* fewer unnecessary observations or interventions,
* lower evidence cost,
* and stronger robustness under unseen causal structures.

The main comparison is between agents that seek evidence for the target answer and agents that either answer immediately, retrieve facts, select actions randomly, or try to reduce uncertainty over the full causal graph.

## The broader goal

This work is part of a broader shift in how we think about LLM reasoning.

Reasoning should not only mean producing a chain of thought or a final answer.

For causal agents, reasoning should also mean knowing:

> What evidence do I need before I should answer?

That is the behavior we aim to model.