import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

const PORT = 4840
const app = express();

app.get('/', (req, res) => {
    return res.send('Home page')
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});