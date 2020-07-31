const Cache = require('@11ty/eleventy-cache-assets');
require('dotenv').config();

const API_KEY = process.env.WAKATIME_KEY;
const API = 'https://wakatime.com/api/v1';
const url = `${API}/users/current/stats/last_30_days?api_key=${API_KEY}`;

module.exports = async () => {
  try {
    const items = await Cache(url, {
      duration: '1h',
      type: 'json',
    });
    return items;
  } catch (err) {
    console.log(err);

    return [];
  }
};
