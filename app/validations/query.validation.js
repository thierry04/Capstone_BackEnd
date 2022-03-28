"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateQueriesSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

// eslint-disable-next-line import/prefer-default-export
var CreateQueriesSchema = _joi["default"].object().keys({
  name: _joi["default"].string().required().min(3),
  email: _joi["default"].string().required().min(5).pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email"),
  query: _joi["default"].string().required().min(6),
  phone: _joi["default"].string().required().min(10).max(10)
});

exports.CreateQueriesSchema = CreateQueriesSchema;