import { sqlPool } from '../index.js';
import { isValidEmail, isValidPassword, isValidUsername } from '../validation/formsValidation.js'


let lastFavoriteId = 0;
const favoriteArr = [];

export const login = async (req, res) => {
    const data = req.body;
    const {email, password} = data;
    const connection = await sqlPool();
    
    if (email !== isValidEmail(email)) {
        return res.send(JSON.stringify({
            type: 'error',
            message: isValidEmail(email),
        }));
    }

    if (password !== isValidPassword(password)) {
        return res.send(JSON.stringify({
            type: 'error',
            message: isValidPassword(password),
        }));
    }

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password = ?;`;
        const dbResponse = await connection.execute(selectQuery, [email, password]);

        if (dbResponse[0].length === 0) {
            return res.send(JSON.stringify({
                message: 'Such user does not exist',
                loggedIn: false,
            }));
        }

        if (dbResponse[0].length === 1) {
            return res.send(JSON.stringify({
                message: 'Welcome',
                loggedIn: true,
                userId: dbResponse[0][0].id,
            }));
        }

        return res.send(JSON.stringify({
            message: 'Such user does not exist',
            loggedIn: false,
        }));

    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Could not find user',
            loggedIn: false,
        }));
    }
}


export const register = async (req, res) => {
    const data = req.body;
    const {name, email, password} = data;
    const connection = await sqlPool();

    if (name !== isValidUsername(name)) {
        return res.send(JSON.stringify({
            type: 'error',
            message: isValidUsername(name),
        }));
    }

    if (email !== isValidEmail(email)) {
        return res.send(JSON.stringify({
            type: 'error',
            message: isValidEmail(email),
        }));
    }

    if (password !== isValidPassword(password)) {
        return res.send(JSON.stringify({
            type: 'error',
            message: isValidPassword(password),
        }));
    }

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ?;`;
        const dbResponse = await connection.execute(selectQuery, [email]);

        if (dbResponse[0].length > 0) {
            return res.send(JSON.stringify({
                message: 'User already exists',
                register: false,
            }));
        }
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Problem while trying to register a user',
            register: false,
        }));
    }

    try {
        const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`;
        const dbResponse = await connection.execute(insertQuery, [name, email, password]);

        if (dbResponse[0].affectedRows !== 1) {
            return res.send(JSON.stringify({
                message: 'User could not be created, for some weird reason',
                register: false,
            }));
        }

        return res.send(JSON.stringify({
            message: 'User successfully registered',
            register: true,
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Problem while trying to register a user',
        }));
    }
}

export const favorite = async (req, res) => {
    const {userId, href, favorit } = req.body;
    const connection = await sqlPool();

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
            isInArr: true,
        })

        for (const user of users) {
            if (user.id === userId) {
                user.favoriteList.push(lastFavoriteId);
                break;
            }
        }
    }

    console.log(favoriteArr)
    
    return res.send(JSON.stringify({
        favoriteArr,
        isInArr: false,
    }));
}

export const deleteFavorite = async (req, res) => {

    const connection = await sqlPool();
    const delMovieId = (+req.params.favoriteId);
    let index = 0;

    for (let i = 0; i < favoriteArr.length; i++) {
        if (favoriteArr[i].id === delMovieId) {
            index = i;
        }
    }

    favoriteArr.splice(index, 1);

    return res.send(JSON.stringify({
        message: 'favorite deleted' 
    }));

}
