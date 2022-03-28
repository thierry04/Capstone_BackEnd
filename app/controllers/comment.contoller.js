"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAllComments = exports.createComment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _comment = _interopRequireDefault(require("../models/comment.models"));

var _validations = require("../validations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var createComment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, _validate, errors, createdComment;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _objectSpread({}, req.body);
            console.log(data);
            _validate = (0, _validations.validate)(_validations.commentValidation.createCommentSchema, req.body), errors = _validate.details;

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
            return _comment["default"].create(req.body);

          case 9:
            createdComment = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              message: "successfully created a comment",
              createdComment: createdComment
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createComment = createComment;

var findAllComments = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var foundComment;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _comment["default"].find();

          case 2:
            foundComment = _context2.sent;

            if (foundComment) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "comment not found"
            }));

          case 5:
            return _context2.abrupt("return", res.status(200).json({
              message: "success",
              foundComment: foundComment
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findAllComments(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findAllComments = findAllComments;