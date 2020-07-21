const moment = require('moment');

module.exports = (value) => {
  const format = 'ddd, MMM Do, YYYY';
  const date = moment(value).utc();

  return date.format(format);
};
