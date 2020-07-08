const moment = require('moment');

module.exports = (value) => {
  return moment(value).format('dddd, MMMM Do, YYYY [at] h:mm a');
};
