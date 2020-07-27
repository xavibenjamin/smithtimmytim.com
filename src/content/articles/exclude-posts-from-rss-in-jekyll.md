---
title: 'Exclude Posts From RSS in Jekyll'
subhead: 'Two different solutions depending on your circumstance'
date: '2017-11-09T15:26-07:00'
tags: 'Code'
series: 'hacking-jekyll'
---

Let's say you want to exclude a post from your RSS feed. How do you go about doing that? Well, there are a few ways. First, you'd need to add something to the front matter of your post:

```yaml
# 01-01-2017-test-post.md
title: Test Post
exclude_rss: true
```

We can use the `exclude_rss` variable to then filter out posts we don't want in our feed.

## Solution One: if Statement

Open up your feed file, mine is called `atom.xml`.

```liquid
<!-- atom.xml -->
{% raw %}{% for post in site.posts %}
  {% if post.exclude_rss != true %}
    <!-- entry stuff goes in here -->
  {% endif %}
{% endfor %}{% endraw %}
```

This solution definitely works, and if your circumstances aren't very complex, you'd be totally fine to use this. But this solution breaks down quickly if you want only a certain type of post in your feed.

## Solution Two: where and where_exp Filter

Let's introduce some complexity into our problem. Let's say we want to limit our feed to twenty entries where the only entries are articles, and we can still filter out specific posts.

We'll use the `where` and `where_exp` filter. [You can read a little bit more about them in the Jekyll Docs](https://jekyllrb.com/docs/templates/). The reason we need these more advanced filters is because if we're creating an articles-only feed with twenty entries, we'd want twenty entries of articles. If we were to use the `if` statement method, we wouldn't get twenty entries of articles if in the last twenty entries only two were articles. That would only give us two entries.

Again, we'll open up our feed file. The following is what mine looks like, but modify as you see necessary.

```liquid
<!-- atom.articles.xml -->
{% raw %}{% assign posts = site.posts | where_exp:"post", "post.exclude_rss != true" | where:"custom_type","post" %}
{% for post in posts limit:20 %}
  <!-- entry stuff here -->
{% endfor %}{% endraw %}
```

This code tells our `for` loop to only iterate on posts where `post.exclude_rss ` is not equal to `true` and where the `custom_type` is `post`. This method gets us twenty entries of articles and excludes posts we don't want in the feed.

I love this about Jekyll: there a few different ways of doing things depending on how complex you want to get.
