---
title: 'Scheduled Posts in Jekyll with Zapier'
subhead: 'Turned out to be a lot less difficult than anticipated'
date: 2018-10-16T11:18-07:00
tags: 'Code'
series: 'hacking-jekyll'
---

One of the tradeoffs of using a static site generator like Jekyll is not having scheduled posts. Sure you can add a date in the future, but static means exactly that, there's no dynamic part to find and compare dates and times. Without complex hacks, I hadn't found an easy way to do scheduled posts with Jekyll. That is, until now.

[As of Jekyll 3](https://jekyllrb.com/docs/upgrading/2-to-3/#future-posts), the `--future` flag is disabled on build. This means that if you give a post a date in the future, it'll be excluded from the build until the time is either equal to or after the date you set. Sweet! We can set the post date to sometime in the future, then trigger a deploy after that time. This is where Zapier comes in.

[Zapier](https://zapier.com/) allows you to create triggers at a certain time of the day, so I have a trigger set for 6am and 12noon. Zapier then triggers a deploy on Netlify at those times everyday[^options]. You can add triggers for however many times you'd like to rebuild the site. I usually post twice a day so I only have two setup. In my posts, I set the time to like 5:45am or 11:50am so that when the triggers run, these new posts will be included in the build.

And there you have it! Scheduled posts in Jekyll with no difficult (or fragile) hacks.

[^options]: Zapier will even let you pick if you want this trigger to happen on weekends.
