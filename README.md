# jrnl-parse

[![Current Version](https://badgen.net/npm/v/jrnl-parse)](https://www.npmjs.org/package/jrnl-parse)
![CI](https://github.com/sloria/jrnl-parse/workflows/CI/badge.svg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=sloria/jrnl-parse)](https://dependabot.com)

Parses [jrnl](http://jrnl.sh) files in Node.js or the browser.

```
npm install jrnl-parse
```

```javascript
import parse from "jrnl-parse";

const jrnl = `2023-08-21 09:01 What is jrnl?

jrnl is a simple journal application for your command line.
Journals are stored as human readable plain text files.

2023-08-22 14:42 Some jrnl features*

* Tagging and filtering
* DayOne Integration
* Optional encryption

@jrnl and @gettingstarted
`;

const result = parse(jrnl);

console.log(JSON.stringify(result, null, 2));
// [
//   {
//     "starred": false,
//     "date": "2023-08-21T13:01:00.000Z",
//     "title": "What is jrnl?",
//     "body": "\njrnl is a simple journal application for your command line.\nJournals are stored as human readable plain text files.\n\n"
//     "tags": [],
//   },
//   {
//     "starred": true,
//     "date": "2023-08-22T18:42:00.000Z",
//     "title": "Some jrnl features",
//     "body": "\n* Tagging and filtering\n* DayOne Integration\n* Optional encryption\n"
//     "tags": ["jrnl", "gettingstarted"],
//   }
// ]
```

## API

### `parse(input, [config])`

- `input`: Input string to parse
- `config`:
  - `timeformat`: Format for timestamps. Default: `"YYYY-MM-DD HH:mm"`
  - `tagsymbols`: Symbols to use for tags. Default: `"@"`

## Developing

- `npm install`
- To run tests: `npm test`
- To run tests in watch mode: `npm test -- --watch`

## Related

- [jrnl-render](https://github.com/sloria/jrnl-render) - Render a jrnl
  file as a webpage.

## License

MIT Licensed.
