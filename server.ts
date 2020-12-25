import express from 'express';
import path from 'path'; // use this for dynamic path once compiled

const app: express.Application = express();

const PORT: string | number = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile('index.html')
})

app.get('/ping', (req: express.Request, res: express.Response) => {
    res.send("Hello!")
})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})

