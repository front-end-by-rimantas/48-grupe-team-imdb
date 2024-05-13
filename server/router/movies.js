import express from "express";
import {
  getMovies,
  searchMovies,
  getMovie,
  addMovie,
  deleteMovies,
  updateMovies,
  getMostProfitable,
  setRate,
  getIsUserRated
} from "../controllers/movies-controller.js";
import { uploadMovie } from "../controllers/upload-controller.js";

const router = express.Router();

router.get("/get", getMovies);
router.get("/get-most-profitable", getMostProfitable);
router.get("/get/:href", getMovie);
router.get("/search", searchMovies);
router.post('/add', addMovie);  
router.post('/set-rate', setRate); 
router.get("/get-user-is-rated/:userId/:movieId", getIsUserRated); 
router.put('/update/:id', updateMovies)
router.delete('/delete/:id', deleteMovies)
router.post('/upload', uploadMovie)



export default router;
