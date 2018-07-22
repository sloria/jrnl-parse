import parse from "../src";

const file = `2018-06-03 14:28 Foo bar baz

not much to see here

@javascript

2018-07-04 02:34 Happy america day*

yay usa

2018-08-21 04:56 No body
`;

describe("parsing simple.txt", () => {
  it("should parse attributes", () => {
    const result = parse(file);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toEqual(3);
    const entry = result[0];
    expect(entry.title).toEqual("Foo bar baz");
    expect(entry.date).toEqual(new Date("2018-06-03 14:28"));
    expect(entry.body).toEqual("\nnot much to see here\n\n@javascript\n\n");
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
    expect(entry.body).toEqual("");
  });
});
