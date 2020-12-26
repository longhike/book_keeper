"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
var PORT = process.env.PORT || 3000;
var uri = 'mongodb://127.0.0.1:27017/local';
mongoose_1.default
    .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Connected to mongodb");
    }
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
var controller_1 = __importDefault(require("../controller/controller"));
app.use(controller_1.default);
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.get('/ping', function (req, res) {
    res.send("Hello!");
});
app.listen(PORT, function () {
    console.log("App listening on " + PORT);
});
