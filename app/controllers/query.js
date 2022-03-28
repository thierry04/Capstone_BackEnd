"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuery = exports.findOneQuery = exports.findAllQueries = exports.deleteQuery = exports.createQuery = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _query = _interopRequireDefault(require("../models/query.model"));

var _validations = require("../validations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var createQuery = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _validate, errors, createdArticle;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _objectSpread({}, req.body);
            _validate = (0, _validations.validate)(_validations.queryValidation.CreateQueriesSchema, req.body), errors = _validate.details;

            if (!errors) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "please provide ".concat(errors[0].context.key)
            }));

          case 4:
            if (!(req.body === undefined)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "data not found"
            }));

          case 6:
            _context.next = 8;
            return _query["default"].create(data);

          case 8:
            createdArticle = _context.sent;

            if (createdArticle.name) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "it does not work"
            }));

          case 11:
            console.log(createdArticle, '====');
            return _context.abrupt("return", res.status(200).json({
              message: "successfully created an query",
              createdArticle: createdArticle
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createQuery(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createQuery = createQuery;

var findAllQueries = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var foundQuery;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _query["default"].find();

          case 2:
            foundQuery = _context2.sent;

            if (foundQuery) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "query not found"
            }));

          case 5:
            return _context2.abrupt("return", res.status(200).json({
              message: "success",
              foundQuery: foundQuery
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findAllQueries(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findAllQueries = findAllQueries;

var findOneQuery = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _id, findOneQuery;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.params.id;
            _context3.next = 3;
            return _query["default"].findOne({
              _id: _id
            });

          case 3:
            findOneQuery = _context3.sent;

            if (findOneQuery) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "one query not found"
            }));

          case 6:
            return _context3.abrupt("return", res.status(200).json({
              message: "success",
              findOneQuery: findOneQuery
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findOneQuery(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findOneQuery = findOneQuery;

var updateQuery = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _id, foundOneQuery, data, _validate2, errors, updateOneQuery, updated;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = req.params.id;
            _context4.next = 3;
            return _query["default"].findOne({
              _id: _id
            });

          case 3:
            foundOneQuery = _context4.sent;

            if (foundOneQuery) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "one query not found"
            }));

          case 6:
            data = {
              name: req.body.name || foundOneQuery.name,
              phone: req.body.phone || foundOneQuery.phone,
              query: req.body.query || foundOneQuery.query,
              email: req.body.email || foundOneQuery.email
            };
            _validate2 = (0, _validations.validate)(_validations.queryValidation.CreateQueriesSchema, req.body), errors = _validate2.details;

            if (!errors) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "please provide ".concat(errors[0].context.key)
            }));

          case 10:
            _context4.next = 12;
            return _query["default"].findOneAndUpdate({
              _id: _id
            }, data);

          case 12:
            updateOneQuery = _context4.sent;

            if (updateOneQuery) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "one query not found"
            }));

          case 15:
            _context4.next = 17;
            return _query["default"].findOne({
              _id: _id
            });

          case 17:
            updated = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              message: "success",
              updated: updated
            }));

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateQuery(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateQuery = updateQuery;

var deleteQuery = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _id, foundOneQuery;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.params.id;
            _context5.next = 3;
            return _query["default"].findOne({
              _id: _id
            });

          case 3:
            foundOneQuery = _context5.sent;

            if (foundOneQuery) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "one query not found"
            }));

          case 6:
            _context5.next = 8;
            return _query["default"].findOneAndDelete({
              _id: _id
            });

          case 8:
            return _context5.abrupt("return", res.status(200).json({
              message: "query successfully deleted"
            }));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteQuery(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteQuery = deleteQuery;