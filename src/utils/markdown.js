// Markdown stuff
const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItTOC = require('markdown-it-table-of-contents');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItMentions = require('markdown-it-mentions');
const markdownItEmoji = require('markdown-it-emoji');
const markdownItMark = require('markdown-it-mark');

const markdownItOpts = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
};

const markdownEngine = markdownIt(markdownItOpts);

markdownEngine
  .use(markdownItFootnote)
  .use(markdownItMark)
  .use(markdownItAbbr)
  .use(markdownItEmoji)
  .use(markdownItTOC, {
    listType: 'ol',
  })
  .use(markdownItMentions, {
    external: true,
  })
  .use(markdownItAnchor, {
    level: 2,
    permalink: true,
    permalinkSymbol: '#',
  });

// Footnote Modifications
markdownEngine.renderer.rules.footnote_caption = (tokens, idx) => {
  const n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ':' + tokens[idx].meta.subId;
  }

  return n;
};

module.exports = markdownEngine;
