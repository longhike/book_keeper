import express from 'express';
import Book from '../models/books';

const Router: express.Router = express.Router();

Router
    .get('/books', async (req: express.Request, res: express.Response) => {
        try {
            const books = await Book.find({})
            if (!books) {
                console.log('no books yet');
            } else {
                res.json(books)
            }
        }
        catch (err) {
            console.log(err.message);
        }

    })
    .post('/books', (req: express.Request, res: express.Response) => {
        let postObj = req.body
        Book.create(postObj)
        .then(response => res.json(response))
        .catch(err => console.log(err.message))
    })
    .post('/books/delete:id', (req: express.Request, res: express.Response) => {
        let delStr = req.params.id;
        Book.findOneAndRemove({ _id: delStr }, (err: Error) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('successfully deleted');
            }
        })

    }
    )


export default Router;