---
title: 'Switching Back to Kramdown'
subhead: 'Quick update on my markdown woes'
date: '2016-11-15T15:19-07:00'
topics: 'code'
series: 'hacking-jekyll'
---

I've written previously on [switching to Redcarpet to process markdown](/2015/12/switching-to-redcarpet/). Since then, I was determined to find out if I could do the same thing with [Kramdown](https://github.com/gettalong/kramdown) since it's already a dependency of [Jekyll](http://jekyllrb.com/).

{% alert { label: 'Being Picky About Dependencies' } %}
I try as much as I can to minimize the dependencies needed to run this site. This site is for fun at the end of the day, but if I can remove things that do the same exact thing, I want to.
{% endalert %}

Turns out, that writing Github Flavored Markdown is super easy with Kramdown. So easy in fact, that I don't understand how I didn't figure this out earlier. Here are the markdown-related lines in my `_config.yml`:

```yaml
# Markdown Rendering
markdown: kramdown
markdown_ext:  markdown,mkdown,mkdn,mkd,md,mdown

kramdown:
  input: GFM
```

That's it! No additional gems to install or nothing. In fact, if you were using Redcarpet, you should delete it from your `Gemfile`.

Happy Jekyll-ing!

