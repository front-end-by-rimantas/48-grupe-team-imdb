import express from "express";
import fs from "fs";
import { getMovies} from "../controllers/movies-controller.js";

const router = express.Router();

// router.get('/add', addMovie)  
router.get("/get", getMovies);
// router.patch('/update', updateMovies)
// router.delete('/delete', deleteMovies)
router.get("/get/:href", (req, res) => {
  const { href } = req.params;
  fs.readFile("../server/data/data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error reading config file" });
      return;
    }
    const movies = JSON.parse(data);
    const movie = movies.movies.find(movie => movie.href === href);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  });
});


export default router;
