var letterboxd = require('letterboxd');

module.exports = async () => {
  const items = letterboxd('ttimsmith', function (error, items) {
    if (error) {
      return console.log(error);
    }

    // console.log(items);
  });

  return items;
};
