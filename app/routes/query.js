"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _query = require("../controllers/query");

var _auth = _interopRequireDefault(require("../middleware/auth"));

var queryRoutes = (0, _express.Router)();
var auth = _auth["default"].auth;
queryRoutes.post("/", _query.createQuery);
queryRoutes.get("/", auth, _query.findAllQueries);
queryRoutes.get("/:id", _query.findOneQuery);
queryRoutes.patch("/:id", auth, _query.updateQuery);
queryRoutes["delete"]("/:id", auth, _query.deleteQuery);
var _default = queryRoutes;
exports["default"] = _default;