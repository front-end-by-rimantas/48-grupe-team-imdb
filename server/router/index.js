import express from 'express';
import userRouter from './user.js'
import moviesRouter from './movies.js'
import helpRouter from './help.js'

const router = express.Router();


// user routu grupe skirta gauti duomenis apie useri pvz atlikti CRUD operacijas
router.use('/user', userRouter)
// movies routu grupe skirta gauti/manipuliuoti duomenimis apie filmus pvz atlikti CRUD operacijas, paieska
router.use('/movies', moviesRouter)
router.use('/help', helpRouter)

export default router;
