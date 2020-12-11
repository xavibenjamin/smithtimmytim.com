// https://github.com/davidmerfield/Typeset
const typeset = require('typeset');

module.exports = (options) => {
  return function applyTypeset(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      const result = typeset(content, options);
      return result;
    }

    return content;
  };
};
