"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../config/db"));
var graphql_1 = require("graphql");
var Book = new graphql_1.GraphQLObjectType({
    name: 'Book',
    description: 'a book',
    fields: function () {
        return {
            id: {
                type: graphql_1.GraphQLString,
                resolve: function (book) {
                    return book.id;
                }
            },
            title: {
                type: graphql_1.GraphQLString,
                resolve: function (book) {
                    return book.title;
                }
            },
            authorLast: {
                type: graphql_1.GraphQLString,
                resolve: function (book) {
                    return book.authorLast;
                }
            },
            authorFirst: {
                type: graphql_1.GraphQLString,
                resolve: function (book) {
                    return book.authorFirst;
                }
            }
        };
    }
});
var Query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'root query',
    fields: function () {
        return {
            books: {
                type: new graphql_1.GraphQLList(Book),
                args: {
                    id: {
                        type: graphql_1.GraphQLString
                    },
                    title: {
                        type: graphql_1.GraphQLString
                    },
                    authorLast: {
                        type: graphql_1.GraphQLString
                    },
                    authorFirst: {
                        type: graphql_1.GraphQLString
                    }
                },
                resolve: function (root, args) {
                    return db_1.default.models.books.findAll({ where: args });
                }
            }
        };
    }
});
var Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    description: 'add books, delete book by id',
    fields: function () {
        return {
            addBook: {
                type: Book,
                args: {
                    title: {
                        type: graphql_1.GraphQLString
                    },
                    authorLast: {
                        type: graphql_1.GraphQLString
                    },
                    authorFirst: {
                        type: graphql_1.GraphQLString
                    }
                },
                resolve: function (_, args) {
                    return db_1.default.models.books.create({
                        title: args.title,
                        authorLast: args.authorLast,
                        authorFirst: args.authorFirst
                    });
                }
            }
        };
    },
});
var Schema = new graphql_1.GraphQLSchema({
    query: Query,
    mutation: Mutation
});
exports.default = Schema;
