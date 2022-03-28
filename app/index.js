"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _database = _interopRequireDefault(require("./config/database"));

var _routes = _interopRequireDefault(require("./routes"));

var _morgan = _interopRequireDefault(require("morgan"));

var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
(0, _database["default"])();
app.use("/api/v1", _routes["default"]);
app.use('/', function (req, res) {
  res.status(200).json({
    message: "Welcome to notion's"
  });
});
var port = process.env.PORT || 4000;
app.listen(port, console.log("app is listening to port ".concat(port)));