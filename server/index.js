import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router/index.js';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import { isValidEmail, isValidPassword, isValidUsername } from './validation/formsValidation.js';


const PORT = 4840;
const app = express();

const corsOptions = {
  origin: "http://localhost:4839",
};
const helmetOptions = {
    crossOriginResourcePolicy: false,
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(router);

app.get('/', (req, res) => {
    return res.send('Home page');
});

const users = [];

app.post('/api/register', (req, res) => {
    const data = req.body;
    const {name, email, password} = data;

    const nameR = isValidUsername(name);
    const emailR = isValidEmail(email);
    const passwordR = isValidPassword(password);

    let isUniqueUserEmail = true;

    for (const user of users) {
        if (user.email === emailR || 
            user.name === nameR || 
            user.password === passwordR) {
            isUniqueUserEmail = false;
            break;
        }
    }

    if (isUniqueUserEmail) {
        users.push(req.body);
        console.log(users);

        return res.send(JSON.stringify({
            message: 'User successfully registered',
            register: true,
        }));
    }

    return res.send(JSON.stringify({
        message: 'User already exists',
        register: false,
    }));
});

app.post('/api/login', (req, res) => {
    const data = req.body;
    const {email, password} = data;

    const emailL = isValidEmail(email);
    const passwordL = isValidPassword(password);

    let userExists = false;

    for (const user of users) {
        if (user.email === emailL &&
            user.password === passwordL) {
            userExists = true;
            break;
        }
    }

    if (userExists) {
        return res.send(JSON.stringify({
            message: 'User successfully logged in',
            loggedIn: true,
        }));
    }

    return res.send(JSON.stringify({
        message: 'Such user does not exist',
        loggedIn: false,
    }));
});



const favoriteArr = [];

app.post('/api/favorite', (req, res) => {
    const { href, favorite } = req.body;
    console.log(favorite)
    
    let isInArr = false;

    for (const favorit of favoriteArr) {
        console.log(favorit, href)
        if (favorit === href) {
            isInArr = true;
            break
        }
    }

    if (!isInArr) {
        favoriteArr.push(href)
    }
    return res.send(JSON.stringify({
        arr: favoriteArr,
        statusOffFavorite: favorite,
        isInArr: false,
    }));
    
    // return res.send(JSON.stringify({
    //     arr: [],
    //     statusOffFavorite: favorite,
    //     isInArr: true,
    // }));
});


app.get('*', (req, res) => {
    console.log('404');
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