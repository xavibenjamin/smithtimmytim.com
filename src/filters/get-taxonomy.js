module.exports = (arr, match) => {
  const filtered = (item) => item.fileSlug == match;

  return arr.filter(filtered);
};
