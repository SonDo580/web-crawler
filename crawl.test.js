const { normalizeURL, getURLsFromHTML } = require("./crawl");

// TEST normalizeURL
test("strip https", () => {
  expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});
test("strip http", () => {
  expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});
test("strip trailing slash", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );
});
test("normalize capital", () => {
  expect(normalizeURL("https://BLoG.boOt.dEv/path")).toBe("blog.boot.dev/path");
});

// TEST getURLsFromHTML
test("absolute URL", () => {
  const html = `
<html lang="en">
    <body>
        <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
    </body>
</html>
`;
  const baseURL = "https://blog.boot.dev";
  const expected = ["https://blog.boot.dev/path/"];

  expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});

test("relative URL", () => {
  const html = `
<html lang="en">
    <body>
        <a href="/path/">Boot.dev Blog</a>
    </body>
</html>
`;
  const baseURL = "https://blog.boot.dev";
  const expected = ["https://blog.boot.dev/path/"];

  expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});

test("multiple links", () => {
  const html = `
<html lang="en">
    <body>
        <a href="https://blog.boot.dev/path1/">Boot.dev Blog</a>
        <a href="/path2/">Boot.dev Blog</a>
    </body>
</html>
`;
  const baseURL = "https://blog.boot.dev";
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];

  expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});

test("invalid URL", () => {
  const html = `
<html lang="en">
    <body>
        <a href="invalid">Boot.dev Blog</a>
    </body>
</html>
`;
  const baseURL = "https://blog.boot.dev";
  const expected = [];

  expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});
