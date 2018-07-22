import { resolve } from "path";

import nodeResolve from "rollup-plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import commonjs from "rollup-plugin-commonjs";

const env = process.env.NODE_ENV;
const umdName = "jrnlParser";

const config = {
  input: resolve("src", "index.js"),
  plugins: []
};

if (env === "cjs" || env === "es") {
  config.output = { format: env };
  config.external = ["date-fns/format", "date-fns/parse", "date-fns/is_valid"];
  config.plugins.push(babel());
}

if (env === "development" || env === "production") {
  config.output = {
    name: umdName,
    format: "umd"
  };
  config.plugins.push(
    commonjs(),
    nodeResolve({
      jsnext: true
    }),
    babel({
      // Needed for rollup: https://rollupjs.org/guide/en#babel
      // NOTE: this gets merged with .babelrc
      plugins: ["external-helpers"]
    })
  );
}

if (env === "production") {
  config.plugins.push(uglify());
}

config.plugins.push(filesize());
export default config;
