"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findOneArticle = exports.findArticle = exports.createArticle = exports.UpdateArticle = exports.DeleteArticle = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _article = _interopRequireDefault(require("../models/article.models"));

var _validations = require("../validations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var createArticle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _validate, errors, createdArticle;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _objectSpread({}, req.body);
            console.log(req.body);
            _validate = (0, _validations.validate)(_validations.articleValidation.createArticleSchema, req.body), errors = _validate.details;

            if (!errors) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "please provide ".concat(errors[0].context.key)
            }));

          case 5:
            if (!(req.body === undefined)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "data not found"
            }));

          case 7:
            _context.next = 9;
            return _article["default"].create(data);

          case 9:
            createdArticle = _context.sent;
            console.log(createdArticle, '====');
            return _context.abrupt("return", res.status(200).json({
              message: "successfully created an article",
              createdArticle: createdArticle
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createArticle(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createArticle = createArticle;

var findArticle = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var foundArticle;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _article["default"].find();

          case 2:
            foundArticle = _context2.sent;

            if (foundArticle) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "article not found"
            }));

          case 5:
            return _context2.abrupt("return", res.status(200).json({
              message: "success",
              foundArticle: foundArticle
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findArticle(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findArticle = findArticle;

var findOneArticle = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _id, findOneArticle;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.params.id;
            _context3.next = 3;
            return _article["default"].findOne({
              _id: _id
            });

          case 3:
            findOneArticle = _context3.sent;

            if (findOneArticle) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "one article not found"
            }));

          case 6:
            return _context3.abrupt("return", res.status(200).json({
              message: "success",
              findOneArticle: findOneArticle
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findOneArticle(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findOneArticle = findOneArticle;

var UpdateArticle = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _id, foundOneArticle, data, _validate2, errors, updateOneArticle, updated;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = req.params.id;
            _context4.next = 3;
            return _article["default"].findOne({
              _id: _id
            });

          case 3:
            foundOneArticle = _context4.sent;

            if (foundOneArticle) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "one article not found"
            }));

          case 6:
            data = {
              title: req.body.title || foundOneArticle.title,
              content: req.body.content || foundOneArticle.content
            };
            _validate2 = (0, _validations.validate)(_validations.articleValidation.updateArticleSchema, req.body), errors = _validate2.details;

            if (!errors) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "please provide ".concat(errors[0].context.key)
            }));

          case 10:
            _context4.next = 12;
            return _article["default"].findOneAndUpdate({
              _id: _id
            }, data);

          case 12:
            updateOneArticle = _context4.sent;

            if (updateOneArticle) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "one article not found"
            }));

          case 15:
            _context4.next = 17;
            return _article["default"].findOne({
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

  return function UpdateArticle(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.UpdateArticle = UpdateArticle;

var DeleteArticle = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _id, foundOneArticle;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.params.id;
            _context5.next = 3;
            return _article["default"].findOne({
              _id: _id
            });

          case 3:
            foundOneArticle = _context5.sent;

            if (foundOneArticle) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "one article not found"
            }));

          case 6:
            _context5.next = 8;
            return _article["default"].findOneAndDelete({
              _id: _id
            });

          case 8:
            return _context5.abrupt("return", res.status(200).json({
              message: "Article successfully deleted"
            }));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function DeleteArticle(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.DeleteArticle = DeleteArticle;