const letterboxd = require('letterboxd');

module.exports = async () => {
  const items = letterboxd('ttimsmith', (error, items) => {
    if (error) {
      return console.log(error);
    }
  });

  return items;
};
