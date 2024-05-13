import { sqlPool } from '../index.js';
import { isValidEmail, isValidPassword, isValidUsername } from '../lib/formsValidation.js'
import { cookieGenerator } from '../lib/cookieGenerator.js';
import { hash } from '../lib/hash.js';

export const login = async (req, res) => {
    const data = req.body;
    const {email, password} = data;
    const connection = await sqlPool();
    
    if (email !== isValidEmail(email)) {
        return res.send(JSON.stringify({
            message: isValidEmail(email),
        }));
    }

    if (password !== isValidPassword(password)) {
        return res.send(JSON.stringify({
            message: isValidPassword(password),
        }));
    }

    let loginObj = null;

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password = ?;`;
        const dbResponse = await connection.execute(selectQuery, [email, hash(password)]);

        if (dbResponse[0].length === 0) {
            return res.send(JSON.stringify({
                message: 'Such user does not exist',
                loggedIn: false,
            }));
        } else if (dbResponse[0].length === 1) {
                loginObj = dbResponse[0][0];
        } else { res.send(JSON.stringify({
                message: 'Such user does not exist',
                loggedIn: false,
                }));
        }

    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Could not find user',
            loggedIn: false,
        }));
    }

    const loginToken = cookieGenerator(20);

    try {
        const insertQuery = `INSERT INTO loginToken (userId, token) VALUES (?, ?);`;
        const dbResponse = await connection.execute(insertQuery, [loginObj.id, loginToken]);

        if (dbResponse[0].affectedRows !== 1) {
            return res.send(JSON.stringify({
                message: 'Problem while trying to login user',
                loggedIn: false,
            }));
        }
    } catch (error) {
        console.error(error)
        return res.send(JSON.stringify({
            message: 'Problem while trying to login user',
            loggedIn: false,
        }));
    }

    const cookie = [
        'loginToken=' + loginToken,
        'domain=localhost',
        'path=/',
        'max-age=' + 1800,
        'SameSite=Lax',
        'HttpOnly',
    ].join('; ');

    return res.set('Set-Cookie', cookie).send(JSON.stringify({
        loggedIn: true,
        userId: loginObj.id,
    }));
}

export const loginCookies = async (req, res) => {
    const connection = await sqlPool();
    const loginTokenSize = 20;

    if (typeof req.cookies.loginToken === 'undefined') {
            return res.send(JSON.stringify({
                message: 'Login token is Undefined',
                loggedIn: false,
            }));
    }

    if (typeof req.cookies.loginToken !== 'string' && req.cookies.loginToken.length !== loginTokenSize) {
        return res.send(JSON.stringify({
            message: 'Login token is invalid',
            loggedIn: false,
        }));
    }

    try {
        const selectQuery = 'SELECT * FROM loginToken INNER JOIN users ON loginToken.userId = users.id;';
        const dbResponse = await connection.execute(selectQuery, [req.cookies.loginToken]);

       

        if (dbResponse.length !== 0) {
            return res.send(JSON.stringify({
                loggedIn: true,
                id: dbResponse[0][0].id,
            }));
        }

    } catch (error) {
        console.error(error)
    }

    return res.send(JSON.stringify({
        message: 'error',
        loggedIn: false,
    }));
}

export const logout = (req, res) => {
    res.clearCookie('loginToken');
    return res.sendStatus(200);
}
    
export const register = async (req, res) => {
    const data = req.body;
    const {name, email, password} = data;
    const connection = await sqlPool();

    if (name !== isValidUsername(name)) {
        return res.send(JSON.stringify({
            message: isValidUsername(name),
        }));
    }

    if (email !== isValidEmail(email)) {
        return res.send(JSON.stringify({
            message: isValidEmail(email),
        }));
    }

    if (password !== isValidPassword(password)) {
        return res.send(JSON.stringify({
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
        const dbResponse = await connection.execute(insertQuery, [name, email, hash(password)]);

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
            message: 'Problem while trying to register a user',
        }));
    }
}


export const favorite = async (req, res) => {
    const { userId, href, imgPath } = req.body;
    const connection = await sqlPool();

    try {
        const selecthref = `SELECT * FROM favoriteMovies WHERE href = ?;`;
        const favoriteMoviesHref = await connection.execute(selecthref, [href]);
        const selectUserId = `SELECT * FROM favoriteMovies WHERE userId = ?;`;
        const favoriteMoviesUserId = await connection.execute(selectUserId, [userId]);
        
        if (favoriteMoviesHref[0].length > 0 && !favoriteMoviesUserId) {
            return res.send(JSON.stringify({
                isInArr: true,
            }));
        }
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Problem while trying add to "favorite movies"',
            register: false,
        }));
    }

    try {
        const insertQuery = `INSERT INTO favoriteMovies (userId, href, imgPath) VALUES (?, ?, ?);`;
        const dbResponse = await connection.execute(insertQuery, [userId, href, imgPath]);

        const selectQuery = `SELECT * FROM favoriteMovies;`;
        const favoriteMoviesList = await connection.execute(selectQuery);

    if (dbResponse[0].affectedRows === 0) {
        return res.send(JSON.stringify({
            message: 'Problem while trying add to "favorite movies"',
        }));
    }
    if (dbResponse[0].affectedRows === 1) {
        return res.send(JSON.stringify({
            id: dbResponse[0].insertId,
            favoriteArr: favoriteMoviesList[0],
            isInArr : false,
        }));
    }
    return res.send(JSON.stringify({
        message: 'Critical error add to "favorite movies"',
    }));

    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Fatal error while trying to add movie card to favorites list',
        }));
    } 
}

export const allFavoriteMovies = async (req, res) => {
    const connection = await sqlPool();
    try {
        const selectQuery = `SELECT * FROM favoriteMovies;`;
        const dbResponse = await connection.execute(selectQuery);

        return res.send(JSON.stringify({
            favoriteArr: dbResponse[0],
        }));
        
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Critical error while trying to get favorite movies"',
        }));
    }
}

export const deleteFavorite = async (req, res) => {

    const connection = await sqlPool();
    const delMovieId = (+req.params.favoriteId);
    
 try {
        const deleteQuery = `DELETE FROM favoriteMovies WHERE id = ?;`;
        const dbResponse = await connection.execute(deleteQuery, [delMovieId]);

        if (dbResponse[0].affectedRows === 0) {
            return res.send(JSON.stringify({
                message: 'Could not delete favorite movie, because it does not exist',
            }));
        }

        return res.send(JSON.stringify({
            message: 'favorite deleted',
        }));

    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            message: 'Critical error while trying to get favorite movies"',
        }));
    }
}
