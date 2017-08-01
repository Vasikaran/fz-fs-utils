const {copy} = require('../lib/index');
const path = require('path');

var src = path.resolve(__dirname, './from/sample');
var target = path.resolve(__dirname, './dist');

copy(src, target);
