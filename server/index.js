import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser';

const PORT = 4840
const app = express();

const corsOptions = {
    origin: 'http://localhost:4839',
};
const helmetOptions = {
    crossOriginResourcePolicy: false,
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/register', (req, res) => {
    const data = req.body;
    const {name, email, password} = data;
    console.log(name, email, password)
    // return res.send(JSON.stringify({
        //     message: 'Register API'
        // }));
    });
    

app.post('/api/login', (req, res) => {
    const data = req.body;
    const {email, password} = data;
    console.log(email, password)
    // return res.send(JSON.stringify({
    //     message: 'Login API'
    // }));
});

app.get('*', (req, res) => {
    return res.send('404 - content not found');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});