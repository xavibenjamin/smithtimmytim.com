---
title: 'Using forloop in Jekyll for Placing Ads'
subhead: 'A quick look at how I made ads less obtrusive for smaller screens'
date: '2018-10-01T15:24-07:00'
topics: 'code'
series: 'hacking-jekyll'
---

One of the things I didn't like about the previous version of this site's design was how prominent the ad was on smaller screens. Instead, I wanted to place the ad after the first post on the homepage.

Thankfully, Jekyll (actually, Liquid) allows us to do this with the `forloop` object. There are lots of things you can do with this, so read [the official documentation](https://help.shopify.com/en/themes/liquid/objects/for-loops) if you want to learn more. We'll first setup our post loop:

```html
{% raw %}<ul class="posts">
  {% for post in site.posts %}
    <li>
      <span class="post-title">{{ post.title }}</span>
      <span class="post-description">{{ post.excerpt }}</span>
    </li>
  {% endfor %}
</ul>{% endraw %}
```

Now, we'll place our ad using `forloop.first`. `forloop.first` will return `true` if it's the first iteration of the loop.

```html
{% raw %}<ul class="posts">
  {% for post in site.posts %}
    <li>
      <span class="post-title">{{ post.title }}</span>
      <span class="post-description">{{ post.excerpt }}</span>
    </li>
    {% if forloop.first %}
      <!-- put your ad markup in here -->
    {% endif %}
  {% endfor %}
</ul>{% endraw %}
```

==In plain English: place the ad directly after the first item in the&nbsp;loop.==

Boom! Now our ad integrates better with the content, and is a better experience for readers because they're aren't hit with an ad as the first thing they see.
