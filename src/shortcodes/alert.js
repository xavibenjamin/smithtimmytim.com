const markdown = require('../utils/markdown.js');

module.exports = (content, options = {}) => {
  const VARIANTS = ['primary', 'success', 'danger'];
  const { label = 'Note', variant = 'primary' } = options;

  if (!VARIANTS.includes(variant)) {
    throw new Error(
      `${variant} is not supported. Try [${VARIANTS.join(', ')}]`
    );
  }
  return `<div class="[ alert ] [ flow flow-space-500 ]" data-variant="${variant}"><p class="alert__label">${label}</p>${markdown.render(
    content
  )}</div>`;
};
