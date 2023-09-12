import express from "express";
import { startAnimus } from './telegram.js';

const client = await startAnimus();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })

app.post('/', (req, res) => {
    const data = req.body;
    client.sendMessage("me", {message: JSON.stringify(data)});
    return res.status(200).json(data);
});

app.listen(4000, () => {
    console.log('Server funcionando');
});