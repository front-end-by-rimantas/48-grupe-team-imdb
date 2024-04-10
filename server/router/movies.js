import express from "express";
import fs from "fs";
import { getMovies} from "../controllers/movies-controller.js";
import { getMovie} from "../controllers/movies-controller.js";

const router = express.Router();

// router.get('/add', addMovie)  
router.get("/get", getMovies);
// router.patch('/update', updateMovies)
// router.delete('/delete', deleteMovies)
router.get("/get/:href", getMovie);


export default router;
