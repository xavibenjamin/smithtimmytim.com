---
title: 'Show Off Your Letterboxd Film Diary with Eleventy'
subhead: 'We’ll use an Eleventy data file and an NPM package to parse the Letterboxd RSS feed into JSON'
date: 2020-07-24T18:52-07:00
topics: 'code'
series: 'learn-eleventy'
draft: true
---

{% youtube 'klz7aNIXUxM' %}

One of my favorite new parts of my site is my Film Diary. I love to watch movies, and I thought it would be fun to prominently display diary entries from Letterboxd.

[[toc]]

Letterboxd is a wonderful film community where you can keep track of films you want to watch and one's you've watched, rate and review films, create lists of films, and the list goes on.

While Letterboxd does have an API, I found the authentication methods a bit more advanced than what I knew how to do. I found [a cool NPM package](https://www.npmjs.com/package/letterboxd) that parses the RSS feed that Letterboxd creates for public profiles and returns that information in JSON.

Let's make this thing.

## Install the Package

Oops! I forgot to do this in the video, but you'll need to first install the package in your terminal.

```bash
npm i letterboxd
```

## Pulling in Our Data

Let's create a new data file. I store mine in `./src/_data/`. We'll call it `letterboxd.js`. Inside this file, we'll write the following:

```js
// ./src/_data/letterboxd.js

const letterboxd = require('letterboxd');

module.exports = async () => {
  const items = await letterboxd('ttimsmith', (error, items) => {
    if (error) {
      return console.log(error);
    }
  });

  return items;
};
```

First, we're pulling in our package into the file by requiring it at the top. Then, we create a constant that'll contain our items. We call the `letterboxd()` function and pass in our username. You'll want to substitute `ttimsmith` for your username.

Next, if there's an error, we're printing out the error with `console.log()`. If everything goes well, we return our items.

## Displaying the Films

Now let's create a partial for our film diary. I put my partials in `./src/_includes/partials/`. We'll call it `film-diary.html`. Inside this file, we'll write the following:

```twig
{% raw %}<!-- ./src/_includes/partials/film-diary.html -->

{% set letterboxdItems = letterboxd.slice(0,5) %}

<div class="film__items">
  {% for item in letterboxdItems %}
  <article class="film__entry">
    <a href="{{ item.uri }}" class="film__url">
      <div class="film__media">
        <img 
          src="{{ item.film.image.tiny }}"
          alt="Poster for {{ item.film.title }}"
          loading="lazy">
      </div>
      <div class="film__info">
        <span class="film__title">{{ item.film.title }}<span class="film__rating">{{ item.rating.text }}</span></span>
        <span class="film__watched-date">{{ item.date.watched }}</span>
      </div>
    </a>
  </article>
  {% endfor %}
</div>{% endraw %}
```

First, we're creating a variable called `letterboxdItems` which returns the first five entries. The function gives us the last fifty entries, and that's way too many for our homepage.

Next, we loop `letterboxdItems` and display the poster, the title of the film, the rating, and the date it was watched.

You'll want to include this partial in your template like this:

```twig
{% raw %}{% include 'partials/film-diary.html' %}{% endraw %}
```

## Wrapping Up

And there you have it! You're pulling in your last five diary entries from Letterboxd and displaying them on your site. Now's the time to add your own styles and make it look great.

If you need help, or end up using this tutorial to create your own film diary, please let me know! I'm @smithtimmytim on Twitter.
