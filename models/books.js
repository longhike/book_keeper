"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = __importDefault(require("../config/db"));
var Book = db_1.default.define('books', {
    title: {
        type: sequelize_1.STRING
    },
    authorLast: {
        type: sequelize_1.STRING
    },
    authorFirst: {
        type: sequelize_1.STRING
    }
});
exports.default = Book;
