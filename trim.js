function trimTrailingSlash(str) {
  return str.replace(/\/+$/, "");
}

module.exports = {
  trimTrailingSlash,
};
