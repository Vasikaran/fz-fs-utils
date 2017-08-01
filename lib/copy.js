'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _copyContent = require('./copyContent');

var _copyContent2 = _interopRequireDefault(_copyContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copy(srcPath, targetPath) {
    var isCopy = true;
    (0, _copyContent2.default)(srcPath, targetPath, isCopy);
}

exports.default = copy;