function sortPages(pages) {
  const pageArr = Object.entries(pages);
  pageArr.sort((a, b) => b[1] - a[1]);
  return pageArr;
}

function printReport(pages) {
  console.log("==========");
  console.log("REPORT");
  console.log("==========");

  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} links to page ${page[0]}`);
  }

  console.log("==========");
  console.log("END");
  console.log("==========");
}

module.exports = { sortPages, printReport };
