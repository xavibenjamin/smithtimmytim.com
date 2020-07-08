// Filters
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const widont = require('./src/filters/widont.js');
const dateReadable = require('./src/filters/date-readable.js');
const dateIso = require('./src/filters/date-iso.js');
const dateNote = require('./src/filters/date-note.js');
const dateNotePermalink = require('./src/filters/date-note-permalink.js');
const dateYear = require('./src/filters/date-year.js');

// Plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const readingTime = require('eleventy-plugin-reading-time');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (config) => {
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/files/');

  // Only minify HTML if we are in production
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Returns work items, sorted by display order
  config.addCollection('work', (collection) => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
  });

  config.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('./src/posts/**/*.md');
  });

  //Add Filters
  config.addFilter('widont', widont);
  config.addFilter('dateReadable', dateReadable);
  config.addFilter('dateIso', dateIso);
  config.addFilter('dateNote', dateNote);
  config.addFilter('dateNotePermalink', dateNotePermalink);
  config.addFilter('dateYear', dateYear);

  // WEBMENTIONS FILTER
  config.addFilter('webmentionsForUrl', (webmentions, url) => {
    // define which types of webmentions should be included per URL.
    // possible values listed here:
    // https://github.com/aaronpk/webmention.io#find-links-of-a-specific-type-to-a-specific-page
    const allowedTypes = ['mention-of', 'in-reply-to'];

    // define which HTML tags you want to allow in the webmention body content
    // https://github.com/apostrophecms/sanitize-html#what-are-the-default-options
    const allowedHTML = {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        a: ['href'],
      },
    };

    // clean webmention content for output
    const clean = (entry) => {
      const { html, text } = entry.content;

      if (html) {
        // really long html mentions, usually newsletters or compilations
        entry.content.value =
          html.length > 2000
            ? `mentioned this in <a href="${entry['wm-source']}">${entry['wm-source']}</a>`
            : sanitizeHTML(html, allowedHTML);
      } else {
        entry.content.value = sanitizeHTML(text, allowedHTML);
      }

      return entry;
    };

    // sort webmentions by published timestamp chronologically.
    // swap a.published and b.published to reverse order.
    const orderByDate = (a, b) => new Date(b.published) - new Date(a.published);

    // only allow webmentions that have an author name and a timestamp
    const checkRequiredFields = (entry) => {
      const { author, published } = entry;
      return !!author && !!author.name && !!published;
    };

    // run all of the above for each webmention that targets the current URL
    return webmentions
      .filter((entry) => entry['wm-target'] === url)
      .filter((entry) => allowedTypes.includes(entry['wm-property']))
      .filter(checkRequiredFields)
      .sort(orderByDate)
      .map(clean);
  });

  // Plugins
  config.addPlugin(syntaxHighlight);
  config.addPlugin(readingTime);
  config.addPlugin(pluginRss);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Markdown stuff
  let markdownIt = require('markdown-it');
  let markdownItFootnote = require('markdown-it-footnote');
  let markdownItAnchor = require('markdown-it-anchor');
  let markdownItTOC = require('markdown-it-table-of-contents');
  let markdownItAbbr = require('markdown-it-abbr');
  let markdownItMentions = require('markdown-it-mentions');

  let markdownItOpts = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  };

  const markdownEngine = markdownIt(markdownItOpts);
  markdownEngine.use(markdownItFootnote);
  markdownEngine.use(markdownItAnchor, {
    level: 2,
    permalink: true,
    permalinkSymbol: '#',
  });
  markdownEngine.use(markdownItTOC, {
    listType: 'ol',
  });
  markdownEngine.use(markdownItAbbr);
  markdownEngine.use(markdownItMentions, {
    external: true,
  });

  config.setLibrary('md', markdownEngine);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
