---
title: 'Blog'
layout: 'layouts/feed.html'
pagination:
  data: collections.posts
  size: 20
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
---

My place to write about development, *Star Wars*, comic books, technology and other geekery.

Subscribe to the [RSS Feed](/blog/feed.xml).
