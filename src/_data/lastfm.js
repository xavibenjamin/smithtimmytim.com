const Cache = require('@11ty/eleventy-cache-assets');
require('dotenv').config();

const API_KEY = process.env.LASTFM_KEY;
const USERNAME = 'timothybsmith';

module.exports = async () => {
  try {
    let json = await Cache(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&limit=10&api_key=${API_KEY}&format=json`,
      {
        duration: '3h',
        type: 'json',
      }
    );
    return json;
  } catch (ex) {
    console.log(ex);

    return [];
  }
};
