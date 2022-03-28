"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArticleSchema = exports.createArticleSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var createArticleSchema = _joi["default"].object().keys({
  title: _joi["default"].string().required().min(3),
  content: _joi["default"].string().required().min(6)
});

exports.createArticleSchema = createArticleSchema;

var updateArticleSchema = _joi["default"].object().keys({
  title: _joi["default"].string().required().min(3),
  content: _joi["default"].string().required().min(6)
});

exports.updateArticleSchema = updateArticleSchema;