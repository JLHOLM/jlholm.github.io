---
layout: post
title: Spiraling down a matrix
author: Justin Holm
---

---

Sometimes you need to spiral down and around an $M$x$N$ 2D matrix. This can be tricky, though, with some thought the solution becomes as clear as day. In this post I hope to walk through a solution that is easy to understand and flexible enough to expand upon.

The base problem we're trying to solve here is that we need _some_ function which allows us to spiral around our matrix. But wait, what's a spiral?

> A spiral is a continuous and gradually widening (or tightening) curve, either around a central point on a flat plane or about an axis so as to form a cone.

First, let's define our matrix $A$ to be of size 4x4 whose elements are non-negative integers. If you notice, as we follow our matrix in a spiral order, we see the elements increase in size until we reach the last element (16), at which point we've reached the end of our matrix. Fig. 1.1 on the right is the spiral ordering we follow that I am referring to. We start from the green dot and finish at the blue dot (16 in Fig. 1.0)

<img src="/assets/images/spiraling_matrix/1.png" style="margin-left: auto; margin-right: auto;">

As an example, if we followed this piral and printed each element as we encountered them, our output would look as follows:

<img src="/assets/images/spiraling_matrix/2.png" style="margin-left: auto; margin-right: auto;">

If we think about our matrix, we have two concentric squares. With each iteration we need to move from the outermost square to the next successive square (the next smallest one), until there exists no smaller square. In our matrix $A$, the outermost square is highlighted in <span style="background-color: #fbf0c6;">yellow</span> and the next successive square is in <span style="background-color: #f8d7d8;">pink</span>. This concept can be applied to any give $M$x$N$ matrix.

<img src="/assets/images/spiraling_matrix/3.png" style="margin-left: auto; margin-right: auto;">

The easiest way to move from the outermost to the next successive square is by using multiple pointers that act as a bounding box. To create such a box we need four (4) pointers; r1, r2, c1 and c2 which map to indices in our matrix. Use our original matrix as an example, our first bounding box to the outermost square will look as follows.

<img src="/assets/images/spiraling_matrix/4.png" width="400" style="margin-left: auto; margin-right: auto;">

Now that we have our bounding box, let's take a look at each sub-block that will be iterated over within our first box (the one highlighted in yellow above). We start by iterating through the <span style="background-color: #c4eae2;">green</span> sub-block, then iterate over the <span style="background-color: #fee5c3;">orange</span> sub-block, <span style="background-color: #e7c1f0;">purple</span> sub-block until finally the <span style="background-color: #bfd9ff;">blue</span> sub-block. Once we've finished processing the blue sub-block, we then know we've successfully iterated over the outermost square and it is time to move to the succeeding square (if one exists). We do this by constricting (or expanding, depending on our problem) our bounding box.

<img src="/assets/images/spiraling_matrix/5.png" width="600" style="margin-left: auto; margin-right: auto;">

If you remember from earlier we create a "box" which acts as our bounding box with the use of four pointers. For each square we process, and only after a successful process, we must increase or decrease these pointers to either constrict or expand our box. In our case, we need to constrict them.

To constrict, we apply the following rules:

<ul>
  <li>increase <code>r1</code> and <code>c1</code> by 1</li>
  <li>decrease <code>r2</code> and <code>c2</code> by 1</li>
</ul>

After applying these two rules, our bounding box will look as follows. I have grayed out the square we have already processed so we can better focus on the remaining square highlighted in <span style="background-color: #f8d7d8;">pink</span>.

<img src="/assets/images/spiraling_matrix/6.png" width="400" style="margin-left: auto; margin-right: auto;">

Applying our logic of breaking the last square into sub-blocks that need to be iterated over, we can clearly see that the pattern we used in the outermost (first) square can easily be applied to this one as well. This means we’re doing something right when our code can work on various sized $M$x$N$ matrices!

<img src="/assets/images/spiraling_matrix/7.png" width="600" style="margin-left: auto; margin-right: auto;">

After applying the pointer rules we laid out above, we observe that r1 and r2 have now crossed paths, and c1 and c2 have also crossed paths. This means we are done and there are no more succeeding squares to process!
