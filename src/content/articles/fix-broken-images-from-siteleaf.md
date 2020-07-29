---
title: 'Fix Broken Images from Siteleaf'
subhead: 'Images weren’t working for me, but I finally figured out what was wrong'
date: '2018-09-24T15:17-07:00'
topics: 'code'
series: 'hacking-jekyll'
---

I recently started using Siteleaf to manage this site, and I had an issue with image uploads. Siteleaf puts images in an `_uploads` folder that Jekyll doesn't output by default.

To fix that, put the following in your `_config.yml` file:

```yaml
collection:
  uploads:
    title: Uploads
    output: true
```

Voilà! Hope this helps you.
