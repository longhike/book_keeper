import express from 'express';
import db from '../config/db'
import Book from '../models/Books';

const Router: express.Router = express.Router();

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
    .post('/delete:id', (req: express.Request, res: express.Response) => {
        let delStr = req.params.id;
        Book.destroy({
            where: { 
                id : delStr 
            }
            })
            .then((err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('successfully deleted');
                }
            })
        
    })


export default Router;