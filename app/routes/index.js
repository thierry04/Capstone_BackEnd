"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _article = _interopRequireDefault(require("./article"));

var _user = _interopRequireDefault(require("./user"));

var _query = _interopRequireDefault(require("./query"));

var _comment = _interopRequireDefault(require("./comment"));

var allRoutes = (0, _express.Router)();
allRoutes.use("/article", _article["default"]);
allRoutes.use("/user", _user["default"]);
allRoutes.use("/query", _query["default"]);
allRoutes.use("/comment", _comment["default"]);
var _default = allRoutes;
exports["default"] = _default;