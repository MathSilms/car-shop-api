import express, { response } from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({ message: "hello world ignite" });
})

app.listen(3333);


