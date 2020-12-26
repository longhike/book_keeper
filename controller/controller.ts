import express from 'express';
import Book from '../models/books';

const Router: express.Router = express.Router();

Router
    .get('/', (req, res) => {
        console.log('hi!');
    })
    .get('/books', async (req: express.Request, res: express.Response) => {
        try {
            const books = await Book.find({})
            if (!books) {
                console.log('no books yet');
            } else {
                console.log(books);
            }
        }
        catch (err) {
            console.log(err.message);
        }

    })


export default Router;