"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var articleSchema = _mongoose["default"].Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
});

var _default = _mongoose["default"].model("Article", articleSchema);

exports["default"] = _default;