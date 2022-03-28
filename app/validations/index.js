"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userValidation = exports.queryValidation = exports.commentValidation = exports.articleValidation = void 0;
exports.validate = validate;

var userValidation = _interopRequireWildcard(require("./user.validation"));

exports.userValidation = userValidation;

var articleValidation = _interopRequireWildcard(require("./article.validation"));

exports.articleValidation = articleValidation;

var queryValidation = _interopRequireWildcard(require("./query.validation"));

exports.queryValidation = queryValidation;

var commentValidation = _interopRequireWildcard(require("./comment.validation"));

exports.commentValidation = commentValidation;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function validate(schema, value) {
  var _schema$validate = schema.validate(value),
      error = _schema$validate.error;

  if (error) return error;
  return false;
}