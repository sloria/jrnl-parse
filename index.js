const formatDate = require("date-fns/format");
const parseDate = require("date-fns/parse");
const isValidDate = require("date-fns/is_valid");

const defaultConfig = {
  // jrnl's default timeformat (%Y-%m-%d %H:%M)
  timeformat: "YYYY-MM-DD HH:mm",
  tagsymbols: "@"
};

const parse = (input, config) => {
  const entries = [];
  const conf = Object.assign({}, defaultConfig, config);
  const dateLength = formatDate(new Date(), conf.timeformat).length;
  let currentEntry = null;
  input
    .replace(/\n+$/, "")
    .split("\n")
    .forEach(ln => {
      let line = ln.replace(/\s+$/, "");
      // try to parse line as date => new entry begins
      const newDate = parseDate(line.slice(0, dateLength), conf.timeformat);
      if (isValidDate(newDate)) {
        // parsing successful => save old entry and create new one
        if (currentEntry) {
          entries.push(currentEntry);
        }

        const starred = line.endsWith("*");
        if (starred) {
          line = line.slice(0, line.length - 1);
        }
        currentEntry = {
          starred,
          date: newDate,
          title: line.slice(dateLength + 1, line.length).replace(/\n+$/, ""),
          body: ""
        };
      } else if (currentEntry) {
        // Happens when we can't parse the start of the line as an date.
        // In this case, just append line to our body.
        currentEntry.body += `${line}\n`;
      }
    });

  // Append last entry
  if (currentEntry) {
    entries.push(currentEntry);
  }
  // TODO: parse tags

  return entries;
};

module.exports = parse;
