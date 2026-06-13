---
title: "A Partially Shared Latent Neural Space for Deductive Reasoning"
collection: publications
category: conferences
permalink: /publication/2026-06-05-latent-neural-space-deductive-reasoning
excerpt: 'The contents above will be part of a list of publications, if the user clicks the link for the publication than the contents of section will be rendered as a full page, allowing you to provide more information about the paper for the reader. When publications are displayed as a single page, the contents of the above "citation" field will automatically be included below this section in a smaller font.'
date: 2026-06-11
venue: 'conference'
authors: '<strong>M. Emre Bilgin</strong>'
tldr: 'Most reasoning fMRI studies ask which brain regions activate. This project asks a different question: can trial-wise brain activity during reasoning be explained by a small number of latent neural factors?

We compare syllogistic and transitive reasoning, estimate ROI-level activity for each trial, and use PCA/factor analysis to search for stable low-dimensional structure. Functional connectivity is used as a complementary check: do these latent factors reflect coordinated network activity?'
paperurl: 'https://academicpages.github.io/files/paper3.pdf'
arxiv: 'x.com/itsmebilgin'
github: 'x.com/itsmebilgin'
website: 'x.com/itsmebilgin'
citation: 'Bilgin, D. (2024). "A Partially Shared Latent Neural Space for Deductive Reasoning" `<i>`conference `</i>`.'
---

Most fMRI studies of reasoning ask a familiar question:

**Which brain regions become more active when people reason?**

That question matters. But it may not be the whole story.

Reasoning is unlikely to live in a single isolated region. When someone solves a deductive problem, many brain areas respond together: frontal regions, parietal regions, subcortical systems, and networks involved in control, memory, and representation.

So in this project, we ask a different question:

> Can reasoning-related brain activity be explained by a small number of shared latent neural factors?

*Instead of asking only which regions activate, we ask whether trial-wise brain activity can be summarized by lower-dimensional neural factors.*

## The problem: “where is reasoning?” may be too narrow

Classic task-fMRI studies usually compare conditions:

* reasoning vs. baseline
* one reasoning task vs. another
* valid vs. invalid arguments
* easy vs. difficult trials

These contrasts are useful. They show which regions are more active in one condition than another.

But a reasoning trial is not just a peak in one region.

It is a distributed activity pattern across many brain areas. If these areas covary across trials, then the neural response to reasoning may be more compact than it first appears.

High-dimensional brain activity may contain low-dimensional structure.

## What we study

We focus on two forms of deductive reasoning:

| Task                  | What it requires                     |
| --------------------- | ------------------------------------ |
| Syllogistic reasoning | categorical and quantifier structure |
| Transitive reasoning  | relational and ordered structure     |

Syllogistic reasoning involves arguments such as:

> All A are B.
> All B are C.
> Therefore, all A are C.

Transitive reasoning involves relational chains such as:

> A is greater than B.
> B is greater than C.
> Therefore, A is greater than C.

Both require inference. But they may rely on partly different representational demands.

That makes them a useful test case: are there neural factors shared across reasoning tasks, and are some factors task-specific?

## The key idea

For each trial, we estimate an ROI-level activity pattern:

> one trial → one vector of brain-region responses

This gives us a trial-by-region matrix.

Then we use latent-factor methods such as PCA and factor analysis to ask whether many regional responses can be summarized by a smaller number of neural components.

*Trial-wise ROI activity is modeled as a matrix. Latent-factor methods ask whether this matrix contains stable lower-dimensional structure.*

The goal is not to immediately call a factor “logic,” “working memory,” or “relational integration.”

Instead, we ask:

* Is the factor stable?
* Does it generalize across tasks?
* Does it distinguish task conditions?
* Does it relate to behavior?
* Does it map onto meaningful brain networks?

## Why functional connectivity matters

Activation tells us which regions respond.

Functional connectivity asks whether regions coordinate with each other.

As a complementary analysis, we test whether latent activation factors relate to task-based network coordination. In other words:

> Do low-dimensional reasoning factors reflect coordinated activity among brain networks?

*The project links trial-wise activation factors with functional connectivity and behavioral performance.*

## Why this matters

This project moves beyond the question:

> Where is reasoning activated?

and asks:

> What low-dimensional neural structure supports reasoning across tasks?

The broader goal is to connect deductive reasoning, trial-wise fMRI, latent-variable modeling, and network neuroscience.

Reasoning may not be best understood as a list of active regions.

It may be better understood as a structured neural state space.

## Read more

* Paper: [link coming soon](#)
* Code and data: [GitHub link coming soon](#)
* Project page: [link coming soon](#)

If you are interested in reasoning, cognitive neuroscience, latent-variable modeling, or task-based functional connectivity, I would be happy to discuss.
