---
title: 'Remove Table of Contents From a Jekyll RSS Feed'
subhead: 'How is this not a post on the internet yet?'
date: '2017-11-07T07:30-07:00'
tags: 'Code'
series: 'hacking-jekyll'
---

As you may have noticed, I added table of contents to appropriate posts. If you hadn't noticed, [take a look at the release notes](/2017/11/version-1-2-0/#add-heading-anchors-and-a-table-of-contents-to-appropriate-places) from the latest version.

Having a table of contents on longer posts is awesome. Some of the longer reviews and development articles are much easier to consume by knowing what's in the article. Adding a table of contents to a Jekyll post is a piece of cake with Kramdown:

```markdown
* table of contents
{:toc}
```

All was fine and dandy with the new table of contents till I realized that they were being output in the RSS feed. 🤦🏽‍ *I didn't want that!* After searching the vast internet cosmos for more than an hour, I wasn't finding what I needed. Shocked and disappointed thinking that no one had written about this, I almost gave up.

Then, finally, [I found it](http://penguindreams.org/blog/removing-footnotes-from-excerpts-in-jekyll/). Well… not really. The article is about removing footnotes from excerpts in Jekyll with the help of the [nokogiri gem](https://rubygems.org/gems/nokogiri). This wasn't what I was trying to do, but close enough that I could modify and make it work.

## The Solution

### Create a Jekyll Plugin

Go to your `_plugins` folder and create a new Ruby file. You can call it whatever you'd like, I called mine `stripTOC.rb`

```ruby
# stripTOC.rb

require 'nokogiri'

module Jekyll
  module StripTocFilter

    def strip_toc(raw)
      doc = Nokogiri::HTML.fragment(raw.encode('UTF-8', :invalid => :replace, :undef => :replace, :replace => ''))

      for block in ['ul'] do
        doc.css(block).each do |ele|
          ele.remove if (ele['id'] == 'markdown-toc')
        end
      end

      doc.inner_html

    end
  end
end

Liquid::Template.register_filter(Jekyll::StripTocFilter)
```

This code creates a new filter that we can use to remove the table of contents from our RSS feed. If you noticed, we're telling it to find any element with the `#markdown-toc` id. This is the id assigned to it by Kramdown.

{% alert { variant: 'danger', label: 'A Note About Plugins on GitHub Pages' } %}
The following method will only work if you self-host your Jekyll site. GitHub Pages doesn't allow custom plugins.
{% endalert %}

### Filtering Our RSS Feed

Now we want to open up our feed and use the filter. Mine is called `atom.xml`.

```xml
<!-- atom.xml -->
<content type="html">
  <![CDATA[
    {% raw %}{{ post.content | strip_toc }}{% endraw %}
  ]]>
</content>
```

Now your table of contents is present on your articles, but doesn't clutter up the RSS feed.
