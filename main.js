const { crawlPage } = require("./crawl");
const { printReport } = require("./report");
const { trimTrailingSlash } = require("./trim");

async function main() {
  if (process.argv.length !== 3) {
    console.log("Usage: npm start <baseURL>");
    process.exit(1);
  }

  const baseURL = trimTrailingSlash(process.argv[2]);
  console.log(`Start crawling ${baseURL}`);

  try {
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);
  } catch (err) {
    console.log(err.message);
  }
}

main();
