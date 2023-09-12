import express from "express";
import { startAnimus } from './telegram.js';
import dotenv from 'dotenv';
dotenv.config();

const client = await startAnimus();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Animus running')
  })

app.post('/', (req, res) => {
    const { token } = req.headers;
    const data = req.body;
    if (token != process.env.TOKEN) {
        return res.status(400).json({ message: 'Erro no autenticador' }); 
    }
    client.sendMessage("me", { message: JSON.stringify(data) });
    return res.status(200).json(data);
});

app.listen(4000, () => {
    console.log('Server funcionando');
});