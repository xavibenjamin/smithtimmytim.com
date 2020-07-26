---
title: 'How I Made My Badass ‘Listening To’ Section'
subhead: 'We’ll use the Last.fm API and Eleventy to make it happen'
featuredImage: '/images/uploads/2020/listening-to-thumb.jpg'
socialImage: '/images/uploads/2020/listening-to-social.jpg'
tags: 'Code'
date: 2020-07-10T09:26-07:00
series: 'learn-eleventy'
---
I listen to music most of the day while I work. It helps me focus, and it makes me happy. When thinking of ideas for my new site, I wanted to show off my recently played tracks to give visitors a sense of my musical taste. After spending some time looking into the Apple Music API, I decided it would be easier to use the Last\.fm API instead.

## Installing Our Packages

First, let's install two packages we'll need to make this work.

```bash
npm install @11ty/eleventy-cache-assets dotenv
```

First, [\@11ty/eleventy-cache-assets](https://www.npmjs.com/package/@11ty/eleventy-cache-assets) will let us fetch data from an external API and cache the results so that we're not requesting data every time we build the site.

Second, [dotenv](https://www.npmjs.com/package/dotenv) will make it easy to handle our local environment variables. Last.fm requires us to send an API key with each request. Which reminds me, [get your API key here](https://www.last.fm/api/account/create). If you're using Netlify, you can [read the documentation](https://docs.netlify.com/configure-builds/environment-variables/) on how to set environment variables.

## Setup Your API Key

Before we begin, you'll need to [get your API key](https://www.last.fm/api/account/create). Next, create a `.env` file in the root of your project and put your key in it. For example:

```text
API_KEY=token_goes_here
```

Remember to add your API key to the server where you host your site. If you're using Netlify, you can [read the documentation](https://docs.netlify.com/configure-builds/environment-variables/) on how to set environment variables to do it.


## Fetching Data

Create a file in your `_data` folder. I called mine `lastfm.js`. We'll add the following to it:

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

And just like that, we have access to the last ten recently played tracks in JSON form. I have the cache set to two hours, but you can set it to whatever you'd like. I couldn't find the rate limit for Last.fm, but I don't want to hit the API multiple times while I work.

## Displaying the Data

Now that we have our data, we can render it in our template. I created a partial called `recently-played.html` in the `_includes/partials` folder. Now we'll add the following:

```twig
{% raw %}<!-- _includes/partials/recently-played.html -->
{% set recentlyPlayed = lastfm.recenttracks.track %}

{% if recentlyPlayed.length %}
<ul class="recently-played">
  {% for item in recentlyPlayed %}
    <li class="recently-played__track">
      <a href="{{ item.url }}" class="track__url">
        <div class="track__media">
          <img
            src="{{ item.image[3]['#text'] }}"
            alt="Album artwork for {{ item.name }} by {{ item.artist['#text'] }}"
            loading="lazy" />
        </div>
        <span class="track__name">{{ item.name }}</span>
        <span class="track__artist">{{ item.artist['#text'] }}</span>
      </a>
    </li>
  {% endfor %}
</ul>
{% endif %}{% endraw %}
```

So we're doing a few things here. We're using Nunjucks to `set` which array we want to loop over. `lastfm` is the name of the data file, `recenttracks` is the object that contains our `track`s, and each `track` has our necessary items. From there, we only render the rest of the template if there are songs to display.

You'll then want to include this partial in your template like this:

```twig
{% raw %}{% include "partials/recently-played.html" %}{% endraw %}
```

## Conclusion

And just like that, we've fetched our data and rendered it in our template! Now it's your turn to add some style. This is the moment I felt like a total badass, hope you're feeling it too.

If you need some help or end up using this on your site, please let me know! You can find me on Twitter as @smithtimmytim. Happy coding!
