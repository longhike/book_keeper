import express from 'express';

const app: express.Application = express();

const PORT: any = process.env.PORT || 3030;

app.get('/ping', (req: express.Request, res: express.Response) => {
    res.send("Hello!")
})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})

