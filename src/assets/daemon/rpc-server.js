#!/usr/bin/env node

'use strict'
Object.defineProperty(global, "_bitcore", {
  get() {
    return void 0
  },
  set() {},
});
const genaroshare = require('genaroshare-daemon');
const dnode = require('dnode');
let api = new genaroshare.RPC();

dnode(api.methods).listen(process.env.RPC_PORT, () => {
  process.send({
    state: 'init'
  });
});

process.on('uncaughtException', (err) => {
  Object.assign({}, err);
  process.send({
    error: err.stack
  }); // 'A Fatal Exception has occured in the genaroshare-daemon RPC server'
});
