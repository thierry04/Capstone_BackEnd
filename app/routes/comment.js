"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _comment = require("../controllers/comment.contoller");

var _auth = _interopRequireDefault(require("../middleware/auth"));

var commentRoutes = (0, _express.Router)();
var auth = _auth["default"].auth;
commentRoutes.post("/", _comment.createComment);
commentRoutes.get("/", auth, _comment.findAllComments);
var _default = commentRoutes;
exports["default"] = _default;