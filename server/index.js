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


let lastUserId = 0;
const users = [];

let lastFavoriteId = 0;
const favoriteArr = [];

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
        users.push({
            id: ++lastUserId,
            name,
            email,
            password,
            favoriteList: [],
        });

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

    let userId = -1;

    for (const user of users) {
        if (user.email === emailL &&
            user.password === passwordL) {
            userId = user.id;
            break;
        }
    }

    if (userId > 0) {
        return res.send(JSON.stringify({
            message: 'User successfully logged in',
            loggedIn: true,
            userId,
        }));
    }

    return res.send(JSON.stringify({
        message: 'Such user does not exist',
        loggedIn: false,
    }));
});


app.post('/api/favorite', (req, res) => {
    const {userId, href, favorite } = req.body;
    
    let isInArr = false;

    for (const favorit of favoriteArr) {
        if (favorit.href === href && favorit.userId === userId) {
            isInArr = true;
            break
        }
    }

    
    if (!isInArr) {
        favoriteArr.push({
            id: ++lastFavoriteId,
            userId,
            href,
        })

        for (const user of users) {
            if (user.id === userId) {
                user.favoriteList.push(lastFavoriteId);
                break;
            }
        }
    }
    
    console.log(users, favoriteArr)
    
    return res.send(JSON.stringify({
        favoriteArr,
        isInArr: false,
    }));
    

});


app.get('/api/favorit/:userId', (req, res) => {
    return res.send(JSON.stringify({
        list: favoriteList.filter(favorit => favorit.userId === +req.params.userId),
    }));
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