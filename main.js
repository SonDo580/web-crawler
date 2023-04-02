const { crawlPage } = require("./crawl");

async function main() {
  if (process.argv.length !== 3) {
    console.log("Usage: npm start <baseURL>");
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log(`Start crawling ${baseURL}`);

  const pages = await crawlPage(baseURL, baseURL, {});
  console.log(pages);
}

main();
