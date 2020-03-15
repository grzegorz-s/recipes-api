require("@babel/register")({
  presets: ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
});
require("dotenv").config();

module.exports = require("./app");
