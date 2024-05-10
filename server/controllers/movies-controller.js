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
    const [rows] = await connection.query("SELECT name, year, gross, path, href FROM movies ORDER BY gross DESC LIMIT 20;");
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
    const sql = `SELECT m.*, CAST(COALESCE(AVG(r.rate), null) AS DECIMAL(10,1)) as average_rating FROM movies m LEFT JOIN rating r ON m.id = r.movieId WHERE href = ? GROUP BY m.id;`;
    const connection = await sqlPool();
    const [rows] = await connection.query(sql, [href]);
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
    const sql = `INSERT INTO rating (userId, movieId, rate)
                 VALUES (?, ?, ?)`;
    const values = [userId, movieId, rate];
    const connection = await sqlPool();
    await connection.query(sql, values);
    await connection.end();
    res.status(200).send("Rating saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getIsUserRated(req, res) {
  try {
    const { userId, movieId } = req.params;
    console.log("rate params", req.params);
    // const sql = `SELECT CASE WHEN EXISTS
    // (SELECT * FROM rating WHERE userId = ? AND movieId = ?) 
    // THEN 'TRUE'
    // ELSE 'FALSE'
    // END AS userRated`;
    const sql = `SELECT rate FROM rating WHERE userId = ? AND movieId = ?`;
    const values = [userId, movieId];
    const connection = await sqlPool();
    const [[result]] = await connection.query(sql, values);
    console.log("rest --->>>>", result);
    await connection.end();
    res.status(200).json(result?.rate);
  } catch (error) {
    console.error("get user rated", error);
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
};
