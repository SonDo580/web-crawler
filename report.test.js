const { sortPages } = require("./report");

test("sort pages", () => {
  const input = {
    "wagslane.dev": 67,
    "wagslane.dev/tags": 66,
  };
  const actual = sortPages(input);
  const expected = [
    ["wagslane.dev", 67],
    ["wagslane.dev/tags", 66],
  ];
  expect(actual).toEqual(expected);
});
