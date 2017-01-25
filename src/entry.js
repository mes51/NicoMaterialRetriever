// see: http://qiita.com/matsurai25/items/0682ea179c9f1239712b

try {
  require('es5-shim/es5-shim.min.js');
  require('es5-shim/es5-sham.min.js');
} catch (error) { }

$.global.JSON = require("JSON2");

$.global._ = require("underscore");

require("./main.js");
