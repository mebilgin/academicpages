---
title: 'All About Tensor-I'
date: 2026-03-01
permalink: /posts/2026/03/all-about-tensor-i/
citation: 'Your Name, You. (2024). &quot;Paper Title Number 3.&quot; <i>GitHub Journal of Bugs</i>. 1(3).'
tags:
  - tensor
  - physics
  - vector
---

## 1. What is a Tensor?

If you search "what is a tensor?" on the internet, you will find dozens of answers — and almost all of them will contradict each other:

* "A tensor is just an n-dimensional array."
* "A tensor is a generalization of vectors and scalars."
* "A tensor is a multilinear function."
* "A tensor is an object that obeys the coordinate transformation law."

Each of these statements carries a grain of truth. Yet none of them, standing alone, tells the whole story. This is not a coincidence — and it is certainly not your fault if you find the concept confusing.

The tensor is, at its core, an abstract and complex concept that has evolved over more than a century, shaped by contributions from mathematicians and physicists across very different traditions. Much like how the concept of a vector meant different things to Newton, Hamilton, and Peano — before it was finally crystallized into the axiomatic definition we use today — the tensor has gone through a long and tangled history of competing definitions that still coexist in the literature.

### 1.1 The Etymology: Where Does the Word Come From?

The word tensor has its roots in the Latin *tensus*, meaning stretch or tension.

It was the German physicist Woldemar Voigt who first coined the term in 1898, in the context of studying the mechanical stress and strain of crystals. In his work, both the stress tensor and the strain tensor are symmetric tensors of the second order, each described by six independent components. Voigt's original usage was thus quite narrow — confined to symmetric tensors in elasticity theory.

The term was later adopted by physicists such as Max Abraham (1904), Arnold Sommerfeld (1910), and Max von Laue (1911). It was Einstein and Grossmann (1913) who truly popularized the word by applying it to Ricci's earlier framework — a framework Ricci himself had called a "system", not a "tensor". Because Ricci’s framework actually described "tensor fields" (tensors distributed across space) rather than individual algebraic tensors, this seemingly small naming decision would go on to cause tremendous confusion for generations of students.

### 1.2 Why Is the Concept So Confusing?

To understand why tensors are confusing, it helps to ask: what makes any mathematical concept hard to understand?

There are essentially three reasons:

**1. The concept itself is intrinsically complex.**

**2. The original definitions lacked clarity and rigor.**
Historically, the first attempts to define a mathematical concept are rarely successful in capturing its full essence. It may take decades, even centuries, for a definition to evolve and crystallize. Think of complex numbers, real numbers, continuity, or even vectors — all of these went through long periods of confusion before arriving at their modern, rigorous forms. The tensor is no different.

**3. Different definitions coexist across different fields.**
This is perhaps the deepest source of confusion today. Depending on whether you open a classical physics textbook, a differential geometry book, or a machine learning framework documentation (like TensorFlow or PyTorch), you will encounter fundamentally different-looking definitions. Each is internally consistent, yet each emphasizes a totally different aspect of the same underlying object.

### 1.3 A First, Intuitive Definition

Before diving into formalism, let's build an intuition. You are already familiar with the following objects:

* **A scalar** is a single number. It has magnitude but no direction.  
  $\phi \in \mathbb{R}$
* **A vector** is an ordered list of numbers. It has both magnitude and direction.  
  $\mathbf{v} = (v_1, v_2, \dots, v_n)^T \in \mathbb{R}^n$
* **A matrix** is a 2-dimensional array of numbers, encoding a linear transformation between vector spaces.  
  $A \in \mathbb{R}^{n \times n}$

A tensor can be thought of as a generalization of all of these. In an $n$-dimensional space, the hierarchy looks like this:

| Object | Tensor Order (Rank) | Components |
| :--- | :---: | :---: |
| **Scalar** | 0 | $n^0 = 1$ |
| **Vector** | 1 | $n^1 = n$ |
| **Matrix** | 2 | $n^2$ |
| **Tensor** | $p$ | $n^p$ |

![Scalar, Vector, Matrix, Tensor](/assets/images/tensor-hierarchy.png)
*(Note: Visual representation of dimensions)*

So, a tensor of order $p$ over an $n$-dimensional space has $n^p$ components. But here is the critical point — and what separates a tensor from a mere multidimensional array:

**A tensor is not just its components. It is a geometric object whose components transform in a specific, well-defined way when the coordinate system changes.**

This is the essence. The components of a tensor depend on the chosen basis, but the tensor itself — as a geometric entity — does not. Just as a physical arrow in space does not change when you simply tilt your head or rotate your coordinate axes (only its numerical coordinates change), a tensor obeys precise transformation laws that encode this coordinate-independence.

Formally, a tensor of type $(p,q)$ — with $p$ contravariant and $q$ covariant indices — is a **multilinear map**:

$$
T: \underbrace{V^* \times \cdots \times V^*}_{p} \times \underbrace{V \times \cdots \times V}_{q} \longrightarrow \mathbb{R}
$$

where $V$ is a vector space over $\mathbb{R}$ and $V^*$ is its dual space. 

Don't worry if this definition feels abstract right now. We will unpack every piece of it as we move forward.

### 1.4 The Key Takeaway

For now, hold on to this core idea:

> A tensor is a mathematical object that lives in a structured space. It carries information about magnitude, direction, and the relationships between directions, and it retains its true identity regardless of how you choose to describe it — whether in Cartesian coordinates, spherical coordinates, or any other reference frame.

In the words of the mathematician Élie Cartan: 
> *"As far as possible avoid very formal computations in which an orgy of tensor indices hides a geometric picture which is often very simple."*

That geometric picture — simple at heart, yet incredibly powerful in application — is exactly what we will spend this series uncovering. But before we get to the strict mathematical rules, let's ask the most grounded question: What do these objects actually do in the physical world?

---

## 2. What Does a Tensor Represent?

In the first section, we discussed how confusing the definitions of tensors can be. Now let us go a little deeper into the essence of the matter — what tensors actually represent, both mathematically and physically.

### The Physical and Mathematical Meaning of a Tensor

At a fundamental level in physics, we typically encounter two types of quantities: scalars (things with only magnitude, like mass, temperature, or density) and vectors (things with both magnitude and direction, like velocity or acceleration). But the universe is far too complex to be described solely by arrows pointing in a single direction.

The greatest physical power of a tensor lies in its being entirely independent of coordinate systems (*coordinate-free*). Expressed mathematically, a tensor is a **"linear transformation"** (*linear transformation*) that takes a vector and maps it to another vector, or a **"multilinear function"** that combines multiple vectors to produce a single result.

In truth, the intimidating tensor names we encounter in the literature are nothing more than fancy labels applied to very basic mathematical concepts. For instance, the "metric tensor" in general relativity is fundamentally an inner product (*inner product*) operation; the "inertia tensor" (*inertia tensor*) is simply a linear transformation. Tensors form the universal language that ensures the validity of physical equations regardless of which reference frame (coordinate system) we choose to view them from.

### Real-World Examples: Stress and Diffusion

To make this abstract concept concrete, let us look at two classic real-world examples that show exactly what tensors do in the physical world:

**1. The Stress Tensor: Fluids vs. Solids**
Consider a still fluid — say, water in a pool. Imagine a tiny, imaginary surface element within it. We can represent this surface by a vector $\mathbf{S}$, pointing perpendicular to the surface with a magnitude equal to its area. Because fluids cannot sustain shear forces, the force $\mathbf{F}$ that one side of the water exerts on the other is always **perpendicular** to the surface. This relationship is perfectly captured by a single **scalar** (pressure, $\sigma$): 

$$
\mathbf{F} = \sigma \mathbf{S}
$$

But in a **solid** — such as a crystal or a steel beam — things change. When stress is applied to a solid, the force need not be perpendicular to the surface; it can act at an angle or even parallel to it. We can no longer express this complex relationship with a single number; we need a linear transformation: 

$$
\mathbf{F} = \Sigma \mathbf{S}
$$

![Stress Tensor on a Cube](/assets/images/stress-tensor.png)
*(Figure: Normal and shear stresses on a cube)*

Here, $\Sigma$ is the **Stress Tensor**, and it can be written as a 3×3 matrix. Each component of this matrix (e.g., $\sigma_{ij}$) carries a precise physical meaning. Picture that tiny cube in your mind: the diagonal components (e.g., $\sigma_{11}$ or $\sigma_{22}$) represent **normal stresses** applied perpendicular to the surface (compression or tension), while the off-diagonal components (e.g., $\sigma_{12}$) represent **shear stresses** applied parallel to the surface (friction or sliding). In short, the stress tensor is a mathematical machine that takes a surface vector and transforms it into a force vector.

**2. The Diffusion Tensor: Brain Mapping**
Suppose we are studying how water or other molecules spread through a medium (diffusion). According to Fick's Law, substances flow from regions of high concentration to regions of low concentration. If the medium has the same properties in every direction (like ink dropped into a glass of water), diffusion is equal in all directions (isotropic).

But if the medium is not uniform in all directions — such as the nerve fibers or white matter in our brain — water molecules prefer to flow *along* the fibers rather than cutting across them. This means the direction of molecular flow is not identical to the direction of the concentration gradient. To model this anisotropic (direction-dependent) diffusion process, we use a linear transformation called the **Diffusion Tensor**. The widely used medical technique known as Diffusion Tensor Imaging (DTI) is built on exactly this principle, enabling doctors to map the three-dimensional network of nerve fibers in the brain.

![Diffusion Tensor Imaging](/assets/images/dti-brain.jpg)

As we have seen in both the stress and diffusion examples, the objects we use to calculate forces and flows are, in practice, 3×3 matrices. But does that mean a matrix and a tensor are exactly the same thing? And where do the one-dimensional vectors or directionless scalars (like temperature) we have been using in physics for years fit into this picture? The answer to this question leads us to one of the most elegant hierarchies in all of mathematics.

---

## 3. Scalar, Vector, Matrix, and Tensor

The familiar concepts we constantly encounter in physics and mathematics — scalars, vectors, and matrices — are not independent inventions. On the contrary, each is a member of the same great mathematical family at different levels of a hierarchy. Let us examine this structure and the deep mathematical relationships between them.



### The Hierarchy of Concepts

How many "directions" or "indices" we need to describe a piece of data or a physical state determines that object's place in the hierarchy. This is called the **order (or rank)** of the tensor.

* **Scalar (Rank-0 Tensor):** Quantities expressed by a single number with no direction (such as mass, density, or temperature). Scalars are unaffected by coordinate transformations (invariant).
* **Vector (Rank-1 Tensor):** Objects that have both magnitude and direction. Mathematically, they are written with a single index ($v_i$ or $v^i$).
* **Matrix / Linear Transformation (Rank-2 Tensor):** Two-dimensional arrays of numbers arranged in rows and columns (two indices, e.g., $T_{ij}$). They represent linear transformations between vector spaces, or bilinear forms. The stress tensor discussed in the previous section belongs to this group.
* **Higher-Order Tensors (Rank-$n$):** Structures with 3, 4, or even more indices.

In a space of dimension $n$, a tensor of order $p$ has exactly $n^p$ components (numerical values). In three-dimensional space ($n=3$): a scalar has $3^0 = 1$, a vector has $3^1 = 3$, a matrix has $3^2 = 9$, and a rank-3 tensor has $3^3 = 27$ components.

### What Is a Tensor, Mathematically? (Multilinear Maps)

When we get down to the true mathematical core, we find that the concept of a tensor is the ultimate generalization of scalars, vectors, and matrices. In modern mathematics, a tensor is, in its most fundamental form, a **multilinear map**. 

To express this precisely, we need a vector space $V$ and its dual space $V^*$ (the space of covectors — linear functions on $V$). 

A tensor of type $(p, q)$ — that is, a tensor with $p$ contravariant and $q$ covariant indices — is a multilinear function that takes exactly $p$ dual vectors ($V^*$) and $q$ vectors ($V$) as inputs and returns a single real number ($\mathbb{R}$). 

Its mathematical formula is:
$$
T: \underbrace{V^* \times \cdots \times V^*}_{p \text{ times}} \times \underbrace{V \times \cdots \times V}_{q \text{ times}} \longrightarrow \mathbb{R}
$$

This definition perfectly explains why tensors are a "generalization":
* A **scalar** is a $(0,0)$-type tensor; it takes no inputs and is simply a number.
* A **vector** is a $(1,0)$-type tensor; it takes a covector and produces a number.
* A **covector (linear form)** is a $(0,1)$-type tensor; it takes a vector and produces a number.
* A **linear transformation (matrix)** is a $(1,1)$-type tensor; it takes a vector and a covector and returns a scalar (or equivalently, maps a vector to another vector).

Another way to express tensors is by writing them in terms of basis vectors using the **tensor product ($\otimes$)**. For example, a rank-2 tensor $T$ can be written in terms of basis vectors ($e_i$) as:
$$
T = \sum_{i,j} T_{ij} (e_i \otimes e_j)
$$
This notation proves that a tensor is not merely its components ($T_{ij}$), but a geometric whole connected to the vector space basis ($e_i \otimes e_j$) upon which those components depend.

### Key Similarities and Differences

The greatest common ground shared by scalars, vectors, matrices, and tensors is that all of them are geometric objects independent of any coordinate system (*coordinate-free*). When you rotate your reference frame, the existence and meaning of these objects never change.

However, what makes an object a tensor in mathematics is not just the arrangement of numbers in a grid, but rather **how those numbers update when the coordinate system changes (Transformation Laws)**.

For example, suppose you change your axes using a matrix $X$:
* The components of a **vector (contravariant rank-1 tensor)** transform according to $v' = X^{-1} v$.
* The components of a **covector (covariant rank-1 tensor)** transform according to $w' = X^{T} w$.
* The components of a rank-2 **mixed** tensor (e.g., a linear transformation) must change from both sides — with the matrix and its inverse: $A' = X A X^{-1}$.

For mathematicians and physicists, the golden rule for a collection of numbers to earn the title of "tensor" is strict adherence to these transformation laws. But when you step into the world of software engineering — and especially Silicon Valley — the picture changes entirely. The machine learning community has set aside these rigid rules and focused purely on tensors' enormous capacity to store numbers and their computational power. So how did this highly pragmatic approach ignite today's artificial intelligence revolution?

---

## 4. Tensors in Machine Learning: The Multidimensional Form of Data

We have seen that physicists and mathematicians have been grappling with tensors for over a century. But why did Google name its AI chip the "Tensor Processing Unit" (TPU) and its open-source library "TensorFlow" in 2015? What do tensors mean in the world of machine learning? Let us take a mathematical look at this concept through the eyes of data scientists and software engineers.

### What Is a Tensor in ML?

If you look at the machine learning literature or the documentation of modern libraries like TensorFlow or PyTorch, the definition of a tensor is extremely pragmatic: **a tensor is a multidimensional array (*n-dimensional array*)**. 

In the world of computer science, a tensor is formulated as an element of an $\mathbb{R}$ space with certain dimensions (*dimensions/axes*):

$$
T \in \mathbb{R}^{d_1 \times d_2 \times \dots \times d_p}
$$

Here $p$ denotes the **order (*rank*)** of the tensor, and $d_i$ denotes the **size** of each axis. In this context:
* **Rank-0 (Scalar):** $T \in \mathbb{R}$ (A single number)
* **Rank-1 (Vector):** $\mathbf{v} \in \mathbb{R}^{d_1}$ (A list)
* **Rank-2 (Matrix):** $\mathbf{M} \in \mathbb{R}^{d_1 \times d_2}$ (Rows and columns)
* **Rank-3 and Above:** $\mathcal{T} \in \mathbb{R}^{d_1 \times d_2 \times d_3}$ (Nested data cubes)

### What and How Does a Tensor Represent in ML? (Named Tensors)

In machine learning, and especially in artificial neural networks, tensors primarily represent two things: **the data itself** and the **parameters** that the model tries to learn (weights $\mathbf{W}$ and biases $\mathbf{b}$).

![Neural Network Layer](/assets/images/neural-network-layer.png)
*(Figure: Vector and matrix multiplications in artificial neural networks)*

Modern AI research uses **Named Tensor** notation — expressing the axes of tensors by name — in order to process tens of thousands of data points simultaneously.

* **Image Processing (CNNs):** Imagine feeding $B$ (*Batch*) color images to a neural network at the same time. Each image has $C$ color channels (Red, Green, Blue), height $H$, and width $W$. This data batch is formulated as a rank-4 tensor living in the following space:
  $$
  \mathcal{X} \in \mathbb{R}^{B \times C \times H \times W}
  $$
* **Natural Language Processing (NLP):** In the Attention mechanism of Transformer models, data is represented as 4-dimensional tensors in $\mathbb{R}^{B \times S \times H \times D}$ format, over the axes of batch size ($B$), sequence length ($S$), number of attention heads ($H$), and hidden dimension ($D$).

The most fundamental operation in neural networks, the Fully Connected Layer, is nothing other than a mathematical **tensor contraction**. The input vector $\mathbf{x}$ is multiplied by the weight matrix $\mathbf{W}$ and the bias vector $\mathbf{b}$ is added:

$$
y_i = \sum_{j} W_{ij} x_j + b_i
$$

In matrix form, this is the familiar multilinear transformation:

$$
\mathbf{y} = \mathbf{W}\mathbf{x} + \mathbf{b}
$$

### Tensor Calculus: The True Magic of Deep Learning

The true mathematical hero behind the success of artificial intelligence is not merely the tensors that store data, but **Matrix/Tensor Calculus** — which allows us to take derivatives over these tensors.

Deep learning models learn via an algorithm called Gradient Descent. The model makes a prediction, producing a scalar **Loss** ($L \in \mathbb{R}$). For the model to learn means updating its millions of internal weights ($\mathbf{W}$) to minimize this loss.

It is impossible to compute scalar derivatives one by one for millions of weights. Instead, the **partial derivative (gradient)** is taken with respect to an entire weight tensor all at once. The elegant part is this: the derivative of a scalar function ($L$) with respect to a tensor $\mathbf{W}$ is **itself a tensor of the same shape as $\mathbf{W}$**!

$$
\nabla_W L = \frac{\partial L}{\partial \mathbf{W}} \in \mathbb{R}^{d_1 \times d_2}
$$

The learning (update) step is expressed by an elegantly simple tensor equation — subtracting one tensor from the other (where $\eta$ is the learning rate):

$$
\mathbf{W}_{new} = \mathbf{W}_{old} - \eta \frac{\partial L}{\partial \mathbf{W}}
$$

When we need to take the derivative of one vector with respect to another while applying the chain rule, we encounter the **Jacobian Matrix**. The derivative of higher-dimensional tensors with respect to one another produces even higher-order gradient tensors in mathematics. Backpropagation algorithms compute these tensor gradients through matrix multiplications in a matter of seconds, enabling the network to "learn".

***

Tensors entered our lives through the transformation laws that guarantee coordinate-independence in classical physics. Today, through their parallelizable multilinear structures and tensor calculus, they have become the fundamental building block of artificial intelligence in computer science. The same mathematical genius once used to calculate the curvature of the universe is now being used to recognize cats in photographs or to write text like a human. Our next post will cover Methods and Applications related to Tensors.