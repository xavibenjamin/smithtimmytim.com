// Filters
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const widont = require('./src/filters/widont.js');
const dateReadable = require('./src/filters/date-readable.js');
const dateIso = require('./src/filters/date-iso.js');
const dateNotePermalink = require('./src/filters/date-note-permalink.js');
const webmentionsForUrl = require('./src/filters/webmentions-for-url.js');
const webmentionCountByType = require('./src/filters/webmention-count-by-type.js');

// Plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const readingTime = require('eleventy-plugin-reading-time');

// Shortcodes
const screenshot = require('./src/shortcodes/screenshot.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

// Collection Globs
const globs = {
  posts: './src/content/articles/*.md',
  drafts: './src/content/drafts/*.md',
  notes: './src/content/notes/*.md',
  photos: './src/content/photos/*.md',
};

module.exports = (config) => {
  // Pass through files
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/files/');
  config.addPassthroughCopy('./src/fonts/');

  // Only minify HTML if we are in production
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Returns work items, sorted by display order
  config.addCollection('work', (collection) => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
  });

  config.addCollection('posts', (collection) => {
    const drafts = (item) => !(item.data.draft && isProduction);
    const now = new Date();
    const published = (item) => item.date <= now;

    return collection
      .getFilteredByGlob([globs.posts, globs.notes, globs.drafts])
      .filter(drafts)
      .filter(published)
      .reverse();
  });

  config.addCollection('feed', (collection) => {
    const drafts = (item) => !(item.data.draft && isProduction);
    const now = new Date();
    const published = (item) => item.date <= now;

    return collection
      .getFilteredByGlob([globs.posts, globs.notes, globs.drafts, globs.photos])
      .filter(drafts)
      .filter(published)
      .reverse();
  });

  config.addCollection('photos', (collection) => {
    return collection.getFilteredByGlob(globs.photos);
  });

  //Add Filters
  config.addFilter('widont', widont);
  config.addFilter('dateReadable', dateReadable);
  config.addFilter('dateIso', dateIso);
  config.addFilter('dateNotePermalink', dateNotePermalink);
  config.addFilter('webmentionsForUrl', webmentionsForUrl);
  config.addFilter('webmentionCountByType', webmentionCountByType);

  // Plugins
  config.addPlugin(syntaxHighlight);
  config.addPlugin(readingTime);
  config.addPlugin(pluginRss);

  // Shortcodes
  config.addPairedShortcode('screenshot', screenshot);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Markdown stuff
  let markdownIt = require('markdown-it');
  let markdownItFootnote = require('markdown-it-footnote');
  let markdownItAnchor = require('markdown-it-anchor');
  let markdownItTOC = require('markdown-it-table-of-contents');
  let markdownItAbbr = require('markdown-it-abbr');
  let markdownItMentions = require('markdown-it-mentions');
  let markdownItEmoji = require('markdown-it-emoji');

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
  markdownEngine.use(markdownItEmoji);

  markdownEngine.renderer.rules.footnote_caption = (tokens, idx) => {
    const n = Number(tokens[idx].meta.id + 1).toString();

    if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId;
    }

    return '0' + n;
  };

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
