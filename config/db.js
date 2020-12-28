"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var password = process.env.MYSQL_PASSWORD;
var db = new sequelize_1.Sequelize('books', 'root', password, {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = db;
