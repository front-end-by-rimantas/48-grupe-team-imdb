import express from "express";
import { register, login, favorite, deleteFavorite, allFavoriteMovies } from "../controllers/user-controller.js";


const router = express.Router();

router.post('/register', register) // controlleris jau sukurtas
router.post('/login', login)  // controlleris jau sukurtas
router.post('/favorite', favorite)
router.get('/allFavoriteMovies', allFavoriteMovies)  
router.delete('/favorite/:favoriteId', deleteFavorite)
export default router;
