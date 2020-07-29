// Filters
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const widont = require('./src/filters/widont.js');
const dateReadable = require('./src/filters/date-readable.js');
const dateIso = require('./src/filters/date-iso.js');
const dateNotePermalink = require('./src/filters/date-note-permalink.js');
const dateLetterboxd = require('./src/filters/date-letterboxd.js');
const webmentionsForUrl = require('./src/filters/webmentions-for-url.js');
const webmentionCountByType = require('./src/filters/webmention-count-by-type.js');
const getTaxonomy = require('./src/filters/get-taxonomy.js');
const rating = require('./src/filters/rating.js');

// Plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const readingTime = require('eleventy-plugin-reading-time');

// Shortcodes
const screenshot = require('./src/shortcodes/screenshot.js');
const alert = require('./src/shortcodes/alert.js');
const image = require('./src/shortcodes/image.js');
const youtube = require('./src/shortcodes/youtube.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Utilities
const markdown = require('./src/utils/markdown.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

// Collection Globs
const globs = {
  posts: './src/content/articles/*.md',
  drafts: './src/content/drafts/*.md',
  notes: './src/content/notes/*.md',
  photos: './src/content/photos/*.md',
  series: './src/content/series/*.md',
  topics: './src/content/topics/*.md',
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

  config.addCollection('articles', (collection) => {
    const drafts = (item) => !(item.data.draft && isProduction);

    return collection.getFilteredByGlob(globs.posts).reverse().filter(drafts);
  });

  config.addCollection('notes', (collection) => {
    return collection.getFilteredByGlob(globs.notes).reverse();
  });

  config.addCollection('series', (collection) => {
    return collection.getFilteredByGlob(globs.series);
  });

  config.addCollection('topics', (collection) => {
    return collection.getFilteredByGlob(globs.topics);
  });

  //Add Filters
  config.addFilter('widont', widont);
  config.addFilter('dateReadable', dateReadable);
  config.addFilter('dateIso', dateIso);
  config.addFilter('dateNotePermalink', dateNotePermalink);
  config.addFilter('dateLetterboxd', dateLetterboxd);
  config.addFilter('webmentionsForUrl', webmentionsForUrl);
  config.addFilter('webmentionCountByType', webmentionCountByType);
  config.addFilter('getTaxonomy', getTaxonomy);
  config.addFilter('rating', rating);

  // Plugins
  config.addPlugin(syntaxHighlight);
  config.addPlugin(readingTime);
  config.addPlugin(pluginRss);

  // Shortcodes
  config.addPairedShortcode('screenshot', screenshot);
  config.addPairedShortcode('alert', alert);
  config.addShortcode('image', image);
  config.addShortcode('youtube', youtube);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Markdown
  config.setLibrary('md', markdown);

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
