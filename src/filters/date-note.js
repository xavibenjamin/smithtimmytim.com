const moment = require('moment-timezone');

module.exports = (value) => {
  const dt = moment(value).tz('America/Los_Angeles');
  format = 'dddd, MMMM Do, YYYY [at] h:mm a';
  return dt.format(format);
};
