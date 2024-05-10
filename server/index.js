import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './router/index.js';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import mysql from 'mysql2/promise';

const PORT = 4840;
const app = express();

const corsOptions = {
    credentials: true,
    origin: "http://localhost:4839",
};
const helmetOptions = {
    crossOriginResourcePolicy: false,
};

export async function sqlPool() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'imdb', 
        connectionLimit: 10,
    });
    await connection.query("USE imdb");
    return connection;
}

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(router);

app.get('/', (req, res) => {
    return res.send('Home page');
});


app.get('*', (req, res) => {
    // console.log('404');
    return res.send('404 - content not found');
});

app.use((req, res, next) => {
    return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});