---
title: 'The East Wing'
thumb: '/images/work/eastwing/thumb.jpg'
meta:
  roles: ['Host', 'Design', 'Development']
  year: '2012-2015'
subhead: 'I designed and built a site with WordPress for The East Wing, a podcast about people who build the web.'
color: 'e49e37'
displayOrder: 7
---
*The East Wing* was a podcast about people who build the web. I built a website to show the most recent episodes and links mentioned on the show.

## The Problem

I created *The East Wing* because I was unhappy. I was unhappy with my work and felt isolated where I was living at the time. *The East Wing* helped me talk with a lot of my design heroes and learn more about their beginnings.

<blockquote class="pullquote">
  <p>I loved The East Wing. Tim’s masterful interviews resulted in episodes that consistently informed and inspired.</p>
  <small><strong>Wesley Noble</strong>Listener</small>
</blockquote>

Responsive design was a relatively new thing at the time and I was looking for a project that would help me learn how write these new things called media queries.

I'd also read the documentation Apple had for creating an iTunes-compatible RSS feed and was pretty confused. I felt the only way to understand this better was to try it for myself.

<figure class="[ screenshot ] [ image-bleed ]">
  <div class="screenshot__container">
    <img src="/images/work/eastwing/screenshot-homepage.jpg" alt="The East Wing homepage">
  </div>
  <figcaption class="image__caption">
    <p><span class="color-tertiary">↑ Above:</span> Episode titles had to be truncated at the time because it would break the layout otherwise. Ah yes… the good ole days with float layouts.</p>
  </figcaption>
</figure>

## Responsive Design

*The East Wing* was the project where I learned how to build things that were completely flexible. It helped me learn the practicality of using percentages. Through several versions of the site, I learned about using `em`s although not completely understanding *how* to use them.

At the time, I built responsive sites desktop to mobile instead of mobile first. Since then, I've changed my approach to design and code the smallest layout first, then adjust based on the growing browser window. This approach has improved the UX of the sites I make and reduced the amount of CSS I've needed to write.

<figure class="[ screenshot ] [ image-bleed ]" data-variant="2-col">
  <div class="screenshot__container">
    <img src="/images/work/eastwing/screenshot-episode-view.jpg" alt="The East Wing Episode View">
    <img src="/images/work/eastwing/screenshot-sponsor-page.jpg" alt="The East Wing Episode View">
  </div>
  <figcaption class="image__caption">
    <p><span class="color-tertiary">↑ Above:</span> Single episode and sponsorship pages.</p>
  </figcaption>
</figure>

## Creating a Podcast RSS Feed

Writing a custom RSS feed felt like overkill. I could've done this on my own but I decided to use ~~PodPress~~ (this plugin is now defunct). PodPress automatically added the necessary information to the RSS feed and made it easy for me to add the feed to iTunes. I was in the iTunes directory a few days after publishing the first episode.

<blockquote class="pullquote">
  <p>Tim’s show, The East Wing, was a huge creative inspiration for me. So many incredible interviews!</p>
  <small><strong>Justin Jackson</strong>Listener</small>
</blockquote>

The PodPress plugin also gave me some basic statistics on listenership. At the height of its popularity, The East Wing was averaging about 8k downloads per episode.

## Conclusion

I *loved* hosting this show. Writing about it makes me miss it so much. In the three years I ran it, the show was nominated for an award two of those years by Net Magazine. Not only did it teach me new things in frontend development, it also helped me become a better designer and thinker. This show led to speaking opportunities, great friends, and even a few jobs. I hope to one day resurrect it.

You can see [the code I wrote for this site on GitHub](https://github.com/smithtimmytim/The-East-Wing/tree/master/themes/theeastwingv4). If you'd like to listen to the show, ~~[you'll find it here](http://eastwing.net/)~~.
