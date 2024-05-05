import express from "express";
import {
  getMovies,
  searchMovies,
  getMovie,
  addMovie,
  deleteMovies,
  updateMovies,
  getMostProfitable,
} from "../controllers/movies-controller.js";

const router = express.Router();

router.get("/get", getMovies);
router.get("/get-most-profitable", getMostProfitable);
router.get("/get/:href", getMovie);
router.get("/search", searchMovies);
router.post('/add', addMovie);  
router.put('/update/:id', updateMovies)
router.delete('/delete/:id', deleteMovies)



export default router;
