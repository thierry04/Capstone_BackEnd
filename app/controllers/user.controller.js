"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.login = exports.findUser = exports.findOneUser = exports.createUser = exports.DeleteUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireWildcard(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.models"));

var _index = require("../validations/index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var email, foundEmail, data, _validate, errors, salt, hash, createdUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            _context.next = 3;
            return _user["default"].findOne({
              email: email
            });

          case 3:
            foundEmail = _context.sent;

            if (!foundEmail) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "email already exists"
            }));

          case 6:
            data = _objectSpread({}, req.body);
            _validate = (0, _index.validate)(_index.userValidation.CreateSchema, data), errors = _validate.details;

            if (!errors) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "please provide ".concat(errors[0].context.key)
            }));

          case 10:
            if (!(req.body === undefined)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "data not found"
            }));

          case 12:
            _context.next = 14;
            return (0, _bcryptjs.genSalt)(5);

          case 14:
            salt = _context.sent;
            _context.next = 17;
            return _bcryptjs["default"].hash(data.password, salt);

          case 17:
            hash = _context.sent;
            _context.next = 20;
            return _user["default"].create(_objectSpread(_objectSpread({}, data), {}, {
              password: hash
            }));

          case 20:
            createdUser = _context.sent;
            console.log(createdUser, '====');
            return _context.abrupt("return", res.status(200).json({
              message: "successfully created a user",
              createdUser: createdUser
            }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var findUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var foundUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user["default"].find();

          case 3:
            foundUser = _context2.sent;

            if (foundUser) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "user not found"
            }));

          case 6:
            return _context2.abrupt("return", res.status(200).json({
              message: "success",
              foundUser: foundUser
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function findUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findUser = findUser;

var findOneUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _id, findOneUser;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.params.id;
            _context3.next = 3;
            return _user["default"].findOne({
              _id: _id
            });

          case 3:
            findOneUser = _context3.sent;

            if (findOneUser) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "user not found"
            }));

          case 6:
            return _context3.abrupt("return", res.status(200).json({
              message: "success",
              findOneUser: findOneUser
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findOneUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findOneUser = findOneUser;

var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _id, _findOneUser, data, _validate2, errors, salt, hash, dataUpdate, updateProfile;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _id = req.params.id;
            _context4.next = 4;
            return _user["default"].findOne({
              _id: _id
            });

          case 4:
            _findOneUser = _context4.sent;

            if (_findOneUser) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Profile does not exist"
            }));

          case 7:
            data = _objectSpread({}, req.body);
            _validate2 = (0, _index.validate)(userValidate.UpdateSchema, data), errors = _validate2.details;

            if (!errors) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "please provide ".concat(errors[0].context.key)
            }));

          case 11:
            _context4.next = 13;
            return (0, _bcryptjs.genSalt)(5);

          case 13:
            salt = _context4.sent;
            _context4.next = 16;
            return _bcryptjs["default"].hash(data.password, salt);

          case 16:
            hash = _context4.sent;
            dataUpdate = {
              userName: data.userName || _findOneUser.userName,
              email: _findOneUser.email,
              password: hash || _findOneUser.password
            };
            _context4.next = 20;
            return updatedProfile({
              id: req.params.id
            }, dataUpdate);

          case 20:
            updateProfile = _context4.sent;
            return _context4.abrupt("return", Response.success(res, 200, 'your profile has been updated successfully', updateProfile));

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json({
              message: "internal server error"
            }));

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 24]]);
  }));

  return function updateUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var DeleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _id, foundOneUser;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.params.id;
            _context5.next = 3;
            return _user["default"].findOne({
              _id: _id
            });

          case 3:
            foundOneUser = _context5.sent;

            if (foundOneUser) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "user not found"
            }));

          case 6:
            _context5.next = 8;
            return _user["default"].findOneAndDelete({
              _id: _id
            });

          case 8:
            return _context5.abrupt("return", res.status(200).json({
              message: "User successfully deleted"
            }));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function DeleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.DeleteUser = DeleteUser;

var login = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, email, password, user, _validate3, errors, validPass, token;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context6.next = 3;
            return _user["default"].findOne({
              email: email
            });

          case 3:
            user = _context6.sent;

            if (user) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "email has not bee signedup"
            }));

          case 6:
            _validate3 = (0, _index.validate)(_index.userValidation.LoginSchema, req.body), errors = _validate3.details;

            if (!errors) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "please provide ".concat(errors[0].context.key)
            }));

          case 9:
            _context6.next = 11;
            return _bcryptjs["default"].compare(password, user.password);

          case 11:
            validPass = _context6.sent;

            if (validPass) {
              _context6.next = 14;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              mesage: "invalid password"
            }));

          case 14:
            token = _jsonwebtoken["default"].sign({
              _id: user._id
            }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send({
              message: "logged in successfuly",
              user: user,
              token: token
            });

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function login(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.login = login;