const letterboxd = require('letterboxd');

module.exports = async () => {
  try {
    const items = await letterboxd('ttimsmith');
    return items;
  } catch (err) {
    console.log(err);
  }
};
