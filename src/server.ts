import express from 'express';
import mongoose from 'mongoose';

const app: express.Application = express();

const PORT: any = process.env.PORT || 3000;

const uri: string = 'mongodb://127.0.0.1:27017/local';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err: any) => {
      if (err) {
          console.log(err.message);
      } else {
          console.log("Connected to mongodb");
      }
  })


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

import controller from '../controller/controller'
app.use(controller)

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile('index.html')
})

app.get('/ping', (req: express.Request, res: express.Response) => {
    res.send("Hello!")
})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})

