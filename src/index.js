"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var app = express();
var PORT = process.env.PORT || 2500;
dotenv.config({ path: './config/config.env' });
app.listen(3000, function () {
    console.log("Server running in ".concat(process.env.NODE_ENV, " mode on port ").concat(PORT).yellow.bold);
});
