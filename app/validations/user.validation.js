"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateSchema = exports.LoginSchema = exports.CreateSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var CreateSchema = _joi["default"].object().keys({
  Username: _joi["default"].string().required().min(3),
  email: _joi["default"].string().required().min(5).pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email"),
  password: _joi["default"].string().required().min(6)
});

exports.CreateSchema = CreateSchema;

var UpdateSchema = _joi["default"].object().keys({
  userName: _joi["default"].string().min(3),
  email: _joi["default"].string().required().min(5).pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email"),
  password: _joi["default"].string().required().min(6)
});

exports.UpdateSchema = UpdateSchema;

var LoginSchema = _joi["default"].object().keys({
  email: _joi["default"].string().required().min(5).pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email"),
  password: _joi["default"].string().required().min(6)
});

exports.LoginSchema = LoginSchema;