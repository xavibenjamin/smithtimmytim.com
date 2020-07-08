const Cache = require('@11ty/eleventy-cache-assets');
require('dotenv').config();

const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';

module.exports = async () => {
  const domain = 'smithtimmytim.com';
  const token = process.env.WEBMENTION_IO_TOKEN;
  url = `${API_ORIGIN}?domain=${domain}&token=${token}`;
  try {
    let json = await Cache(url, {
      duration: '3h',
      type: 'json',
    });
    return json;
  } catch (ex) {
    console.log(ex);
  }
};
