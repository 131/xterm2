"use strict";

var Terminal   = require('../');

  //provide fit(), proposeGeometry()
require('../addons/fit')(Terminal);

  //wath for links and make them clickable
require('../addons/linkify')(Terminal);


var $ = function(sel) { return  document.querySelector(sel) };

createTerminal();

function createTerminal() {

  var term = new Terminal();

  var colsElement = $('#cols');
  var rowsElement = $('#rows');
  var terminalContainer = $('#terminal-container');

  $('#option-cursor-blink').addEventListener('change', function(){
    term.cursorBlink = this.checked;
  });


  // Clean terminal
  while (terminalContainer.children.length) 
    terminalContainer.removeChild(terminalContainer.children[0]);

  term.open(terminalContainer);



  term.fit();
  var size = term.proposeGeometry();

  colsElement.value = size.cols;
  rowsElement.value = size.rows;

  var charWidth  = Math.ceil(term.element.offsetWidth / size.cols);
  var charHeight = Math.ceil(term.element.offsetHeight / size.rows);

  function setTerminalSize () {
    var cols = parseInt(colsElement.value),
        rows = parseInt(rowsElement.value),
        width = (cols * charWidth).toString() + 'px',
        height = (rows * charHeight).toString() + 'px';

    terminalContainer.style.width = width;
    terminalContainer.style.height = height;
    term.resize(cols, rows);
  }


  colsElement.addEventListener('change', setTerminalSize);
  rowsElement.addEventListener('change', setTerminalSize);


  var protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
  var socketURL = protocol + location.hostname + ((location.port) ? (':' + location.port) : '') + '/';

  var socket = new WebSocket(socketURL);

  socket.onopen  = function() {

    socket.addEventListener('message', function(ev){
      term.write(ev.data)
    });

    term.on('data', function(data){
      socket.send(data);
    });


    term.on('resize', function (size) {
      socket.send(  fromASCII( JSON.stringify({cols : size.cols, rows : size.rows }  )) )
    });
  }
}

  //we do not need Buffer pollyfill for now
var fromASCII = function(str){
  var ret = new Array(str.length), len = str.length;
  while(len--) ret[len] = str.charCodeAt(len);
  return Uint8Array.from(ret);
}


