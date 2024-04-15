import express from "express";
import {
  getMovies,
  searchMovies,
  getMovie,
} from "../controllers/movies-controller.js";

const router = express.Router();

// router.get('/add', addMovie)  
router.get("/get", getMovies);
router.get("/search", searchMovies);
// router.patch('/update', updateMovies)
// router.delete('/delete', deleteMovies)
router.get("/get/:href", getMovie);


export default router;
