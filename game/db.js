module.exports = { hello }

const base = require('../basejs/basemin.js');
const fs = require('fs');

function hello(){console.log('hello!',base.nundef(undefined))}
