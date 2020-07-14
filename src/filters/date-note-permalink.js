const moment = require('moment');

module.exports = (value) => {
  return moment(value).utc().format('MMDDYYYYHHmmss');
};
