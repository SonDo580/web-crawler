function sortPages(pages) {
  const pageArr = Object.entries(pages);
  pageArr.sort((a, b) => b[1] - a[1]);
  return pageArr;
}

module.exports = { sortPages };
