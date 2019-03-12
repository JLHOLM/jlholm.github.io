// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

// Create the lunr index for the search
var index = elasticlunr(function () {
  this.addField('title')
  this.addField('author')
  this.addField('layout')
  this.addField('content')
  this.setRef('id')
});

// Add to this index the proper metadata from the Jekyll content

index.addDoc({
  title: "Spiraling down a matrix",
  author: "Justin Holm",
  layout: "post",
  content: "\n\nSometimes you need to spiral down and around an $M$x$N$ 2D matrix. This can be tricky, though, with some thought the solution becomes as clear as day. In this post I hope to walk through a solution that is easy to understand and flexible enough to expand upon.\n\nThe base problem we’re trying to solve here is that we need some function which allows us to spiral around our matrix. But wait, what’s a spiral?\n\n\n  A spiral is a continuous and gradually widening (or tightening) curve, either around a central point on a flat plane or about an axis so as to form a cone.\n\n\nFirst, let’s define our matrix $A$ to be of size 4x4 whose elements are non-negative integers. If you notice, as we follow our matrix in a spiral order, we see the elements increase in size until we reach the last element (16), at which point we’ve reached the end of our matrix. Fig. 1.1 on the right is the spiral ordering we follow that I am referring to. We start from the green dot and finish at the blue dot (16 in Fig. 1.0)\n\n\n\nAs an example, if we followed this piral and printed each element as we encountered them, our output would look as follows:\n\n\n\nIf we think about our matrix, we have two concentric squares. With each iteration we need to move from the outermost square to the next successive square (the next smallest one), until there exists no smaller square. In our matrix $A$, the outermost square is highlighted in yellow and the next successive square is in pink. This concept can be applied to any give $M$x$N$ matrix.\n\n\n\nThe easiest way to move from the outermost to the next successive square is by using multiple pointers that act as a bounding box. To create such a box we need four (4) pointers; r1, r2, c1 and c2 which map to indices in our matrix. Use our original matrix as an example, our first bounding box to the outermost square will look as follows.\n\n\n\nNow that we have our bounding box, let’s take a look at each sub-block that will be iterated over within our first box (the one highlighted in yellow above). We start by iterating through the green sub-block, then iterate over the orange sub-block, purple sub-block until finally the blue sub-block. Once we’ve finished processing the blue sub-block, we then know we’ve successfully iterated over the outermost square and it is time to move to the succeeding square (if one exists). We do this by constricting (or expanding, depending on our problem) our bounding box.\n\n\n\nIf you remember from earlier we create a “box” which acts as our bounding box with the use of four pointers. For each square we process, and only after a successful process, we must increase or decrease these pointers to either constrict or expand our box. In our case, we need to constrict them.\n\nTo constrict, we apply the following rules:\n\n\n  increase r1 and c1 by 1\n  decrease r2 and c2 by 1\n\n\nAfter applying these two rules, our bounding box will look as follows. I have grayed out the square we have already processed so we can better focus on the remaining square highlighted in pink.\n\n\n\nApplying our logic of breaking the last square into sub-blocks that need to be iterated over, we can clearly see that the pattern we used in the outermost (first) square can easily be applied to this one as well. This means we’re doing something right when our code can work on various sized $M$x$N$ matrices!\n\n\n\nAfter applying the pointer rules we laid out above, we observe that r1 and r2 have now crossed paths, and c1 and c2 have also crossed paths. This means we are done and there are no more succeeding squares to process!\n",
  id: 0
});
console.log( jQuery.type(index) );

// Builds reference data (maybe not necessary for us, to check)
var store = [{
  "title": "Spiraling down a matrix",
  "author": "Justin Holm",
  "layout": "post",
  "link": "/texts/spiraling-down-a-matrix/",
}
]

// Query
var qd = {}; // Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val();

  // The search is then launched on the index built with Lunr
  var result = index.search(query);
  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found '+result.length+' result</p>');
  } else {
    resultdiv.append('<p class="">Found '+result.length+' results</p>');
  }
  // Loop through, match, and add results
  for (var item in result) {
    var ref = result[item].ref;
    var searchitem = '<div class="result"><p><a href="'+store[ref].link+'?q='+query+'">'+store[ref].title+'</a></p></div>';
    resultdiv.append(searchitem);
  }
}

$(document).ready(function() {
  if (qd.q) {
    $('input#search').val(qd.q[0]);
    doSearch();
  }
  $('input#search').on('keyup', doSearch);
});
