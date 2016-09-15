"use strict";


module.exports = function(Xterm) {

  Xterm.prototype.readline = function (opts, chain) {
    var term = this;

    var prompt = opts.prompt || "$";
    term.write(prompt);

    var line = "", onKey = function (key, ev) {
      var printable = (
        !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
      );

      if (ev.keyCode == 13) {
        var lastLine = term.lines.length - (term.rows - term.y);
        var line = term.lines[lastLine].map( (fo) => fo[1]).join('');
        line = line.substr(prompt.length).trim(); //strip prompt & trim
        term.off("key", onKey);
        term.write("\r\n");
        chain(null, line);
      } else if (ev.keyCode == 8) {
       // Do not delete the prompt
        if (term.x > prompt.length) {
          term.write('\b \b');
        }
      } else if (printable) {
        term.write(key);
      }
    };

    term.on('key', onKey);

  };

};

