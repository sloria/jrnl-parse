const formatDate = require("date-fns/format");
const parseDate = require("date-fns/parse");
const isValidDate = require("date-fns/isValid");

const defaultConfig = {
  // jrnl's default timeformat (%Y-%m-%d %H:%M)
  timeformat: "yyyy-MM-dd HH:mm",
  tagsymbols: "@"
};

const parseTags = (input, tagsymbols) => {
  const pattern = new RegExp(`[${tagsymbols}]{1}\\w+`, "g");
  return (input.match(pattern) || []).map(x => x.slice(1));
};

const referenceDate = new Date(1970, 0, 1);

const parse = (input, config) => {
  const entries = [];
  const conf = Object.assign({}, defaultConfig, config);
  const dateLength = formatDate(referenceDate, conf.timeformat).length;
  let currentEntry = null;
  input
    .replace(/\n+$/, "")
    .split("\n")
    .forEach(ln => {
      let line = ln.replace(/\s+$/, "");
      const dateMatch = /^\[(.+)\]/.exec(line);
      const dateString = dateMatch ? dateMatch[1] : null;
      // try to parse line as date => new entry begins
      const newDate = parseDate(dateString, conf.timeformat, referenceDate);
      if (dateMatch && isValidDate(newDate)) {
        // parsing successful => save old entry and create new one
        if (currentEntry) {
          entries.push(currentEntry);
        }

        const starred = line.endsWith("*");
        if (starred) {
          line = line.slice(0, line.length - 1);
        }
        const title = line
          .slice(dateLength + 3, line.length)
          .replace(/\n+$/, "");
        const tags = parseTags(title, conf.tagsymbols);
        currentEntry = {
          starred,
          date: newDate,
          // Add 3 for "[", "]", and " "
          title,
          body: "",
          tags
        };
      } else if (currentEntry) {
        // Happens when we can't parse the start of the line as an date.
        // In this case, just append line to our body.
        currentEntry.body += `${line}\n`;
        currentEntry.tags.push(...parseTags(line, conf.tagsymbols));
      }
    });

  // Append last entry
  if (currentEntry) {
    entries.push(currentEntry);
  }

  return entries;
};

module.exports = parse;
