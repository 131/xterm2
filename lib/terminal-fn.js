"use strict";
//this is only necessary for legacy xterm.js unsane API
//electron (VSCode) require('xterm')()
//you might just want to require('xterm/lib/terminal')
//or use browserify, as the browser field is set properly

var Terminal = require('./terminal');
module.exports = function(options) {
  return new Terminal(options);
}