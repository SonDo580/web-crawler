const { normalizeURL } = require("./crawl");

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
