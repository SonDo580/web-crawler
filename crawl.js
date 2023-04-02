const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(url) {
  const urlObj = new URL(url);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

function getURLsFromHTML(html, baseURL) {
  const dom = new JSDOM(html);
  const linkElems = dom.window.document.querySelectorAll("a");

  const urls = [];
  for (const linkElem of linkElems) {
    const linkHref = linkElem.href;
    try {
      if (linkHref.slice(0, 1) === "/") {
        // relative path
        const urlObj = new URL(`${baseURL}${linkHref}`);
        urls.push(urlObj.href);
      } else {
        // absolute path
        const urlObj = new URL(`${linkHref}`);
        urls.push(urlObj.href);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return urls;
}

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL] += 1;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;

  console.log(`Crawling ${currentURL}`);
  try {
    const response = await fetch(currentURL);

    if (response.status > 399) {
      console.log(`${response.statusText} - page: ${currentURL}`);
      return pages;
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      console.log(`Non HTML response - page: ${currentURL}`);
      return pages;
    }

    const html = await response.text();
    const urls = getURLsFromHTML(html, baseURL);

    for (const url of urls) {
      pages = await crawlPage(baseURL, url, pages);
    }

    return pages;
  } catch (err) {
    console.log(`${err.message} - page: ${currentURL}`);
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
