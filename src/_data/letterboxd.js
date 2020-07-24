var letterboxd = require('letterboxd');

module.exports = async () => {
  const items = await letterboxd('ttimsmith', (error, items) => {
    if (error) {
      return console.log(error);
    }
  });

  return items;
};
