const parse = require(".");

const file = `[2018-06-03 14:28] Foo bar baz @tag1

not much to see here

@javascript @tag3

[2018-07-04 02:34] Happy america day*

yay usa

[2018-08-21 04:56] No body

[2020-04-18 19:27] Alternative tagsymbols for #tag4 and #tag5

but also the regular @tag6
`;

describe("parsing simple.txt", () => {
  it("should parse attributes", () => {
    const result = parse(file);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(4);
    const entry = result[0];
    expect(entry.title).toEqual("Foo bar baz @tag1");
    expect(entry.date).toEqual(new Date("2018-06-03 14:28"));
    expect(entry.body).toEqual(
      "\nnot much to see here\n\n@javascript @tag3\n\n"
    );
  });

  it("should parse stars", () => {
    const result = parse(file);
    const entry = result[1];
    expect(entry.title).toEqual("Happy america day");
    expect(entry.starred).toBe(true);
  });

  it("should parse entries with no body", () => {
    const result = parse(file);
    const entry = result[2];
    expect(entry.title).toEqual("No body");
    expect(entry.body).toEqual("\n");
  });

  it("should parse tags", () => {
    const result = parse(file);
    const entry = result[0];
    expect(entry.tags).toEqual(["tag1", "javascript", "tag3"]);
  });

  it("should parse entries with no tags", () => {
    const result = parse(file);
    const entry = result[1];
    expect(entry.tags).toEqual([]);
  });

  it("should parse alternative tagsymbols", () => {
    const result = parse(file, { tagsymbols: "@#" });
    const entry = result[3];
    expect(entry.tags).toEqual(["tag4", "tag5", "tag6"]);
  });
});
