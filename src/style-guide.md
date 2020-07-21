---
title: 'Style Guide'
layout: 'layouts/page.html'
summary: 'Text and components used through out this site'
---

This page exists to show the different components of my site. More than anything, I maintain it because I think style guides are interesting. There's also a [writing style guide](/style-guide/writing/) if you enjoy that type of stuff.

This website is currently set in Whitney for primary and secondary text, and Whitney Narrow for headings.

## Heading Two

Secondary headings are used to separate portions of text. I don't ever use links in headings unless it's a link post. Primary headings are only used once in the page title or post title. Links in regular text look like [this](/style-guide/).

As normal, you've got styles for `inline code`, _italics_, and **bold text**. Inline code is used when the code isn't multi-line. Italics are used for emphasis, and bold is hardly used but when it is, it's used for the necessary visual contrast. ==This is highlighted text.==

I use horizontal rules for separating ideas in an article.

---

- This is an unordered list.
- Second list item
  - Here's a second-level list item
  - Here's another second-level list item

1. **Goal title one**  
   Some text that explains the goal
2. **Goal title two**  
   More text that explains the goal and gives context. Tells you why I'm setting this as a goal.

### Here's a level three heading

Here's a `blockquote` for you. These are mostly used in link posts to quote writing from elsewhere. They're usually preceded by the person who said or wrote the quote.

Ben Brooks on _The Brooks Review_:

> There’s a lot of good looking options out there, but I wanted to be able to test something affordable for a change. So I reached out to Tom Bihn and asked if I could stop by to test out a few different bags, and possibly swipe one for a while to test out.

I use Github Flavored Markdown for code blocks. In other words, I use three back ticks. I always declare the language that's being used in the code block.

```js
// _data/lastfm.js

const Cache = require('@11ty/eleventy-cache-assets');
require('dotenv').config();

const API_KEY = process.env.LASTFM_KEY;
const USERNAME = 'timothybsmith';
const API = 'http://ws.audioscrobbler.com/2.0/'

module.exports = async () => {
  try {
    const json = await Cache(
      `${API}?method=user.getrecenttracks&user=${USERNAME}&limit=10&api_key=${API_KEY}&format=json`,
      {
        duration: '2h',
        type: 'json',
      }
    );
    return json;
  } catch (ex) {
    console.log(ex);

    return [];
  }
};
```

## What about a table?

Let's look at some data!

| Page | Internet Speed | DOMContentLoaded |
|-|-|-|
| Home (Before) | 110mb/s | 1.10s |
| Home (After) | 110mb/s | 331ms |
| Home (Before) | 3G Slow | 9.35s |
| Home (After) | 3G Slow | 2.50s |
| Article (Before) | 3G Slow | 9.01s |
| Article (After) | 3G Slow | 2.30s |

Here's some CSS since I tend to write about it.

```scss
//--------------------------------
// _footer.scss
// -------------------------------

.site__footer {
  background-color: $slate;
  color: rgba(white, 0.6);
  margin-top: 4rem;
  padding: 2rem 0;
  
  small {
    color: rgba(white, 0.4);
    display: block;
    font-size: 0.9rem;
    margin-top: 2rem;
    width: 100%;
    @media #{$medium-up} {
      font-size: 0.75rem;
    }
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  a {
    text-decoration: none;
  }
  
  .container {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    
    @media #{$large-up} {
      width: 100%;
    }
  }
}
```

## Let's Test That Fluid Type

Lorem ipsum dolor sit amet, consectetur adip*isicing elit, sed do eiusmod *tempor incididunt ut labore et dolore magna aliqua.

And that's it. Oh wait… I forgot something.[^1]

[^1]: Yep. These are footnotes, and this is what they look like. Not a huge deal, but sometimes very necessary.
