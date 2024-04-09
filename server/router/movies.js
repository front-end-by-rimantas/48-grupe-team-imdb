import express from "express";
import {
  getMovies
} from "../controllers/movies-controller.js";

const router = express.Router();

// router.get('/add', addMovie)  
router.get("/get", getMovies);
// router.patch('/update', updateMovies)
// router.delete('/delete', deleteMovies)

export default router;
