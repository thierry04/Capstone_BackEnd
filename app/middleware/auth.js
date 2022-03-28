"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _auth2 = require("../helper/auth");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var authMiddleware = /*#__PURE__*/function () {
  function authMiddleware() {
    (0, _classCallCheck2["default"])(this, authMiddleware);
  }

  (0, _createClass2["default"])(authMiddleware, null, [{
    key: "auth",
    value: function () {
      var _auth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var _req$headers$authoriz, verifyRoutes, user;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                verifyRoutes = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(" ")[1];

                if (!(!verifyRoutes || verifyRoutes === undefined)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  message: "please login first"
                }));

              case 4:
                user = (0, _auth2.verifyToken)(verifyRoutes);
                req.user = user;
                return _context.abrupt("return", next());

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                return _context.abrupt("return", res.status(403).json({
                  message: "you are not allowed"
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function auth(_x, _x2, _x3) {
        return _auth.apply(this, arguments);
      }

      return auth;
    }()
  }]);
  return authMiddleware;
}();

var _default = authMiddleware;
exports["default"] = _default;