# jrnl-parse

[![Current Version](https://img.shields.io/npm/v/jrnl-parse.svg)](https://www.npmjs.org/package/jrnl-parse)
[![Build Status](https://travis-ci.org/sloria/jrnl-parse.svg?branch=master)](https://travis-ci.org/sloria/jrnl-parse)
[![Greenkeeper badge](https://badges.greenkeeper.io/sloria/jrnl-parse.svg)](https://greenkeeper.io/)

Parses [jrnl](http://jrnl.sh) files in Node.js or the browser.

```
npm install jrnl-parse
```

```javascript
import parse from "jrnl-parser";

const jrnl = `2023-08-21 09:01 What is jrnl?

jrnl is a simple journal application for your command line.
Journals are stored as human readable plain text files.

2023-08-22 14:42 Some jrnl features*

* Tagging and filtering
* DayOne Integration
* Optional encryption
`;

const result = parse(jrnl);

console.log(JSON.stringify(result, null, 2));
// [
//   {
//     "starred": false,
//     "date": "2023-08-21T13:01:00.000Z",
//     "title": "What is jrnl?",
//     "body": "\njrnl is a simple journal application for your command line.\nJournals are stored as human readable plain text files.\n\n"
//   },
//   {
//     "starred": true,
//     "date": "2023-08-22T18:42:00.000Z",
//     "title": "Some jrnl features",
//     "body": "\n* Tagging and filtering\n* DayOne Integration\n* Optional encryption\n"
//   }
// ]
```

## API

### `parse(input, [config])`

* `input`: Input string to parse
* `config`:
  * `timeformat`: Format for timestamps. Default: `"YYYY-MM-DD HH:mm"`

## TODO

* [ ] Parse tags

## Developing

* `npm install`
* To run tests: `npm test`
* To run tests in watch mode: `npm test -- --watch`

## License

MIT Licensed.
