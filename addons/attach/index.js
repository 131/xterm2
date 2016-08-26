/*
 * Implements the attach method, that
 * attaches the terminal to a WebSocket stream.
 *
 * The bidirectional argument indicates, whether the terminal should
 * send data to the socket as well and is true, by default.

 * This module provides methods for attaching a terminal to a WebSocket
 * stream.
 *
 * @module xterm/addons/attach/attach
 */


/**
 * Attaches the given terminal to the given socket.
 *
 * @param {Xterm} term - The terminal to be attached to the given socket.
 * @param {WebSocket} socket - The socket to attach the current terminal.
 * @param {boolean} bidirectional - Whether the terminal should send data
 *                                  to the socket as well.
 * @param {boolean} buffered - Whether the rendering of incoming data
 *                             should happen instantly or at a maximum
 *                             frequency of 1 rendering per 10ms.
 */
var attach = function (term, socket, bidirectional, buffered) {
  bidirectional = (typeof bidirectional == 'undefined') ? true : bidirectional;
  term.socket = socket;

  term._flushBuffer = function () {
    term.write(term._attachSocketBuffer);
    term._attachSocketBuffer = null;
    clearTimeout(term._attachSocketBufferTimer);
    term._attachSocketBufferTimer = null;
  };

  term._pushToBuffer = function (data) {
    if (term._attachSocketBuffer) {
      term._attachSocketBuffer += data;
    } else {
      term._attachSocketBuffer = data;
      setTimeout(term._flushBuffer, 10);
    }
  };

  term._getMessage = function (ev) {
    if (buffered) {
      term._pushToBuffer(ev.data);
    } else {
      term.write(ev.data);
    }
  };

  term._sendData = function (data) {
    socket.send(data);
  };

  socket.addEventListener('message', term._getMessage);

  if (bidirectional) {
    term.on('data', term._sendData);
  }

  socket.addEventListener('close', term.detach.bind(term, socket));
  socket.addEventListener('error', term.detach.bind(term, socket));
};



  /**
   * Detaches the given terminal from the given socket
   *
   * @param {Xterm} term - The terminal to be detached from the given socket.
   * @param {WebSocket} socket - The socket from which to detach the current
   *                             terminal.
   */
var detach = function (term, socket) {
  term.off('data', term._sendData);

  socket = (typeof socket == 'undefined') ? term.socket : socket;

  if (socket) {
    socket.removeEventListener('message', term._getMessage);
  }

  delete term.socket;
}

/**
 * This module provides methods for attaching a terminal to a WebSocket
 * stream.
 *
 * @module xterm/addons/attach/attach
 */
module.exports = function(Xterm) {

  /**
   * Attaches the current terminal to the given socket
   *
   * @param {WebSocket} socket - The socket to attach the current terminal.
   * @param {boolean} bidirectional - Whether the terminal should send data
   *                                  to the socket as well.
   * @param {boolean} buffered - Whether the rendering of incoming data
   *                             should happen instantly or at a maximum
   *                             frequency of 1 rendering per 10ms.
   */
  Xterm.prototype.attach = function (socket, bidirectional, buffered) {
    return attach(this, socket, bidirectional, buffered);
  };

  /**
   * Detaches the current terminal from the given socket.
   *
   * @param {WebSocket} socket - The socket from which to detach the current
   *                             terminal.
   */
  Xterm.prototype.detach = function (socket) {
    return detach(this, socket);
  };

}
