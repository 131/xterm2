# xterm2

xterm2 is a terminal front-end component written in JavaScript that works in the browser.  
It enables applications to provide fully featured terminals to their users and create great development experiences.


## Fork(s)
- This project is a lighweight, ES6 driven, module designed, fork of [xterm.js](https://github.com/sourcelair/xterm.js).
- xterm.js is a fork of [Christopher Jeffrey term.js](https://github.com/chjj/term.js/)
- Christopher Jeffrey term.js is a fork from [Fabrice Bellard's javascript vt100 for jslinux](http://bellard.org/jslinux/).

**xterm2 is usable as a drop-in replacement of xterm, is all situation (client side, browserify, electron/nw.js) as it provides the same surface API & signatures.**


## Differences with main project
* lighweight
* ES6 based
* UMD module design
* **sane API**
* no 'build' system, this is just a library for your application to use


## Installation / usage

```
npm install xterm2
# var Terminal = require('xterm2');
```


## Features
- **Text-based application support**: Use xterm2 to work with applications like `bash`, `git` etc.
- **Curses-based application support**: Use xterm2 to work with applications like `vim`, `tmux` etc.
- **Mouse events support**: xterm2 captures mouse events like click and scroll and passes them to the terminal's back-end controlling process
- **CJK (Chinese, Japanese, Korean) character support**: xterm2 renders CJK characters seamlessly
- **IME support**: Insert international (including CJK) characters using IME input with your keyboard
- **Modular, event-based API**: Lets you build addons and themes with ease

## What xterm2 is not
- xterm2 is not a terminal application that you can download and use on your computer
- xterm2 is not `bash`. xterm2 can be connected to processes like `bash` and let you interact with them (provide input, receive output), see [demo](https://github.com/131/xterm2)


## Real term binding demo

To launch the demo simply run:
```
npm install
npm run demo
```
Then open http://localhost:3000/

## Addons

Addons are JavaScript modules that attach functions to the `Terminal` prototype to extend its functionality. There are a handful available in the main repository in the `addons` directory, you can even write your own (though they may break when the internals of xterm2 change across versions).
See the demo app for addon-usage sample.

## Todo  / ongoing
* Slice the internal logic & code between parser & terminal


## License Agreement

If you contribute code to this project, you are implicitly allowing your code to be distributed under the MIT license. You are also implicitly verifying that all code is your original work.

xterm2 Copyright (c) 2016, Francois Leurent (MIT License)  
xterm.js Copyright (c) 2014-2016, SourceLair, Private Company (MIT License)  
xterm.js Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)  
