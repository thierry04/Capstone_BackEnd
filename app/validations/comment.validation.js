"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCommentSchema = exports.createCommentSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var createCommentSchema = _joi["default"].object().keys({
  username: _joi["default"].string().required().min(3),
  comment: _joi["default"].string().required().min(0)
});

exports.createCommentSchema = createCommentSchema;

var updateCommentSchema = _joi["default"].object().keys({
  username: _joi["default"].string().required().min(3),
  comment: _joi["default"].string().required().min(0)
});

exports.updateCommentSchema = updateCommentSchema;