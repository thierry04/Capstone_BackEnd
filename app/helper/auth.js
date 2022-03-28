"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _jsonwebtoken = require("jsonwebtoken");

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var TOKEN_SECRET = process.env.TOKEN_SECRET;

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var secret,
        decoded,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            secret = _args.length > 1 && _args[1] !== undefined ? _args[1] : TOKEN_SECRET;
            decoded = (0, _jsonwebtoken.verify)(token, secret);
            return _context.abrupt("return", decoded);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;