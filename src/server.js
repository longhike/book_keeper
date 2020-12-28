"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
var db_1 = __importDefault(require("../config/db"));
var schema = graphql_1.buildSchema("\n    type Query {\n        hello: String\n    }\n");
var root = { hello: function () { return 'Hello world!'; } };
var app = express_1.default();
var PORT = process.env.PORT || 3000;
db_1.default.authenticate()
    .then(function () { return console.log('DB connected'); })
    .catch(function (err) { return console.log(err.message); });
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
var controller_1 = __importDefault(require("../controller/controller"));
app.use('/books', controller_1.default);
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.get('/ping', function (req, res) {
    res.send("Hello!");
});
db_1.default.sync()
    .then(function () {
    app.listen(PORT, function () {
        console.log("App listening on " + PORT);
    });
});
