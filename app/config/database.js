"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv/config");

var _process$env = process.env,
    MONGO_URL = _process$env.MONGO_URL,
    MONGO_TEST_URL = _process$env.MONGO_TEST_URL,
    NODE_ENV = _process$env.NODE_ENV;

var connectDb = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose["default"].connect(NODE_ENV === 'test' ? MONGO_TEST_URL : MONGO_URL, {
              useNewUrlParser: true
            });

          case 3:
            _context.next = 5;
            return console.log("connected to database successfully");

          case 5:
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("failed to connect to the database", _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function connectDb() {
    return _ref.apply(this, arguments);
  };
}();

var _default = connectDb;
exports["default"] = _default;