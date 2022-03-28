"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var commentSchema = _mongoose["default"].Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

var _default = _mongoose["default"].model("Comment", commentSchema);

exports["default"] = _default;