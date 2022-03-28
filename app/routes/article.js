"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _article = require("../controllers/article.controller");

var _auth = _interopRequireDefault(require("../middleware/auth"));

var articleRoutes = (0, _express.Router)();
var auth = _auth["default"].auth;
articleRoutes.post("/", auth, _article.createArticle);
articleRoutes.get("/", _article.findArticle);
articleRoutes.get("/:id", _article.findOneArticle);
articleRoutes.patch("/:id", auth, _article.UpdateArticle);
articleRoutes["delete"]("/:id", auth, _article.DeleteArticle);
var _default = articleRoutes;
exports["default"] = _default;