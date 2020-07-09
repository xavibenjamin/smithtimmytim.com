const moment = require('moment-timezone');

module.exports = (value, format) => {
  const dt = moment(value).tz('America/Los_Angeles');

  if (!format) {
    format = 'dddd, MMMM Do, YYYY';
  }

  return dt.format(format);
};
