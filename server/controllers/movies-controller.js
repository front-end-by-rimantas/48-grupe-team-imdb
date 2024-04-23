import { sqlPool } from '../index.js';

export async function getMovies() {
  try {
    const connection = await sqlPool();
    const [rows] = await connection.query('SELECT * FROM movies;');
    await connection.end();
    return { movies: rows }; 
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovie(href) {
  try {
    const connection = await sqlPool();
    const [rows] = await connection.query('SELECT * FROM movies WHERE href = ?', [href]);
    await connection.end();
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const searchMovies = async (req, res) => {
  try {
    const { name } = req.query;
    const connection = await sqlPool();
    const [rows] = await connection.query('SELECT * FROM movies WHERE name LIKE ?', [`%${name}%`]);
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
