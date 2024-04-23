import express from "express";
import {
  getMovies,
  searchMovies,
  getMovie,
} from "../controllers/movies-controller.js";

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const movies = await getMovies();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:href", async (req, res) => {
  try {
    const { href } = req.params;
    const movie = await getMovie(href);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/search", searchMovies);
// router.get('/add', addMovie)  
// router.patch('/update', updateMovies)
// router.delete('/delete', deleteMovies)

export default router;
