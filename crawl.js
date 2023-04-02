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

async function crawlPage(currentURL) {
  try {
    const response = await fetch(currentURL);

    if (response.status > 399) {
      console.log(`${response.statusText} - page: ${currentURL}`);
      return;
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      console.log(`Non HTML response - page: ${currentURL}`);
      return;
    }

    const html = await response.text();
    console.log(html);
  } catch (err) {
    console.log(`${err.message} - page: ${currentURL}`);
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
