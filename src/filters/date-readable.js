const moment = require('moment-timezone');

module.exports = (value, format) => {
  const dt = moment(value).tz('America/Los_Angeles');

  if (!format) {
    format = 'ddd, MMM Do, YYYY';
  }

  return dt.format(format);
};
