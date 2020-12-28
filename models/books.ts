import { Sequelize, STRING } from 'sequelize';
import db from '../config/db';


const Book = db.define('books', {
    title: {
        type: STRING
    },
    authorLast: {
        type: STRING
    },
    authorFirst: {
        type: STRING
    }

})

export default Book;