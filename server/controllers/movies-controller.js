import { sqlPool } from "../index.js";

export async function getMovies(req, res) {
  try {
    const connection = await sqlPool();
    const [rows] = await connection.query("SELECT * FROM movies;");
    await connection.end();
    res.json({ movies: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function getMostProfitable(req, res) {
  try {
    const connection = await sqlPool();
    const [rows] = await connection.query(
      "SELECT name, year, gross, path, href FROM movies ORDER BY gross DESC LIMIT 10;"
    );
    // const [rows] = await connection.query("SELECT name, year, gross, path FROM movies;");
    await connection.end();
    res.json({ movies: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMovie(req, res) {
  try {
    const { href } = req.params;
    const sql = `SELECT m.*, COALESCE(AVG(r.rate), 0) as average_rating FROM movies m LEFT JOIN rating r ON m.id = r.movieId WHERE href = ? GROUP BY m.id;`;
    const connection = await sqlPool();
    const [rows] = await connection.query(sql, [href]);
    console.log(href, '--->>')
    // const [rows] = await connection.query(
    //   "SELECT * FROM movies WHERE href = ?",
    //   [href]
    // );
    await connection.end();
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const searchMovies = async (req, res) => {
  try {
    const { name } = req.query;
    const connection = await sqlPool();
    const [rows] = await connection.query(
      "SELECT * FROM movies WHERE name LIKE ?",
      [`%${name}%`]
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export async function addMovie(req, res) {
  try {
    const {
      name,
      year,
      rating,
      category,
      ageCenzor,
      awards,
      gross,
      url,
      path,
      description,
      href,
      userId,
    } = req.body;
    const sql = `INSERT INTO movies (name, year, rating, category, ageCenzor, awards, gross, url, path, description, href, userId) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      name,
      year,
      rating,
      category,
      ageCenzor,
      awards,
      gross,
      url,
      path,
      description,
      href,
      userId,
    ];
    const connection = await sqlPool();
    await connection.query(sql, values);
    await connection.end();
    res.status(200).send("Item added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function setRate(req, res) {
  try {
    const { userId, movieId, rate } = req.body;
    console.log(req.body);
    const sql = `INSERT INTO rating (userId, movieId, rate)
                 VALUES (?, ?, ?)`;
    const values = [userId, movieId, rate];
    const connection = await sqlPool();
    await connection.query(sql, values);
    await connection.end();
    res.status(200).send("Rating saved successfully");
  } catch (error) {
    console.error(error);
    console.log("lorem ipsum");
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateMovies(req, res) {
  try {
    const {
      name,
      year,
      rating,
      category,
      ageCenzor,
      awards,
      gross,
      url,
      path,
      description,
      href,
    } = req.body;
    const { id } = req.params;
    const sql = `UPDATE movies SET name =?, year =?, rating =?, category =?, ageCenzor =?, awards =?, gross =?, url =?, path =?, description =?, href =? WHERE id =?`;
    const values = [
      name,
      year,
      rating,
      category,
      ageCenzor,
      awards,
      gross,
      url,
      path,
      description,
      href,
      id,
    ];
    const connection = await sqlPool();
    await connection.query(sql, values);
    await connection.end();
    res.status(200).send("Item updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMovies(req, res) {
  try {
    const { id } = req.params;
    const sql = `delete from movies where id = ?`;
    const values = [id];
    const connection = await sqlPool();
    await connection.query(sql, values);
    await connection.end();
    res.status(200).send("Item deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
