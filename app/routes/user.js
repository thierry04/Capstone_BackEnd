"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _auth = _interopRequireDefault(require("../middleware/auth"));

var userRoutes = (0, _express.Router)();
var auth = _auth["default"].auth;
userRoutes.post("/", _user.createUser);
userRoutes.post("/", _user.createUser);
userRoutes.get("/", _user.findUser);
userRoutes.get("/:id", _user.findOneUser);
userRoutes.patch("/:id", _user.updateUser);
userRoutes["delete"]("/:id", auth, _user.DeleteUser);
userRoutes.post('/login', _user.login);
var _default = userRoutes;
exports["default"] = _default;