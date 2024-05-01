import { sqlPool } from '../index.js';
import { isValidEmail, isValidPassword, isValidUsername } from '../validation/formsValidation.js'


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
    const { userId, href } = req.body;
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
        const insertQuery = `INSERT INTO favoriteMovies (userId, href) VALUES (?, ?);`;
        const dbResponse = await connection.execute(insertQuery, [userId, href]);

        const selectQuery = `SELECT * FROM favoriteMovies;`;
        const favoriteMoviesList = await connection.execute(selectQuery);

    if (dbResponse[0].affectedRows === 0) {
        return res.send(JSON.stringify({
            type: 'error',
            message: 'The card cannot be added (dublicate found)',
        }));
    }
    if (dbResponse[0].affectedRows === 1) {
        return res.send(JSON.stringify({
            type: 'success',
            id: dbResponse[0].insertId,
            favoriteArr: favoriteMoviesList[0],
            isInArr : false,
        }));
    }
    return res.send(JSON.stringify({
        type: 'error',
        message: 'Critical error add to "favorite movies"',
    }));

    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Fatal error while trying to add movie card to favorites list',
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
                type: 'error',
                message: 'Could not delete favorite movie, because it does not exist',
            }));
        }

        return res.send(JSON.stringify({
            type: 'success',
            message: 'favorite deleted',
        }));

    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to get favorite movies"',
        }));
    }
}
