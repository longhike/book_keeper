import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import path from 'path';
import db from '../config/db'

var schema = buildSchema(`
    type Query {
        hello: String
    }
`)

var root = { hello: () => 'Hello world!' };
const app: express.Application = express();

const PORT: any = process.env.PORT || 3000;

db.authenticate()
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err.message));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))
app.use(express.json())

import controller from '../controller/controller'
app.use('/books', controller)

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile('index.html')
})

app.get('/ping', (req: express.Request, res: express.Response) => {
    res.send("Hello!")
})

db.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on ${PORT}`);
        })
        
    })

