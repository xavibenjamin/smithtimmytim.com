module.exports = (webmentions, url, ...types) => {
  const isUrlMatch = (entry) =>
    entry['wm-target'] === url ||
    entry['wm-target'] === url.replace('smithtimmytim.com');

  return String(
    webmentions
      .filter(isUrlMatch)
      .filter((entry) => types.includes(entry['wm-property'])).length
  );
};
