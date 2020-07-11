const Cache = require('@11ty/eleventy-cache-assets');
require('dotenv').config();

const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';

module.exports = async () => {
  const domain = 'smithtimmytim.com';
  const token = process.env.WEBMENTION_IO_TOKEN;
  const url = `${API_ORIGIN}?domain=${domain}&token=${token}&per-page=10000`;

  try {
    let webmentions = await Cache(url, {
      duration: '2h',
      type: 'json',
    });
    return webmentions;
  } catch (error) {
    console.warn(error.message);
    return {
      children: [],
    };
  }
};
