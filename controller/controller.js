"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Books_1 = __importDefault(require("../models/Books"));
var Router = express_1.default.Router();
Router
    // .get('/', async (req: express.Request, res: express.Response) => {
    //     try {
    //         const books = await Book.findAll()
    //         if (!books) {
    //             console.log('no books yet');
    //         } else {
    //             res.json(books)
    //         }
    //     }
    //     catch (err) {
    //         console.log(err.message);
    //     }
    // })
    // .post('/', (req: express.Request, res: express.Response) => {
    //     let postObj = req.body
    //     Book.create(postObj)
    //     .then(response => res.json(response))
    //     .catch(err => console.log(err.message))
    // })
    .post('/delete:id', function (req, res) {
    var delStr = req.params.id;
    Books_1.default.destroy({
        where: {
            id: delStr
        }
    })
        .then(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('successfully deleted');
        }
    });
});
exports.default = Router;
