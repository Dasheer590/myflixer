import express from 'express';
import { getMovies, getMovie, getGenre, getDirector, addMovieToFavorites, removeMovieFromFavorites, createMovie } from '../controllers/movies.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/:title', getMovie);
router.get('/genres/:name', getGenre);
router.get('/directors/:name', getDirector);
router.post('/', createMovie);  
router.post('/:userId/favorites/:movieId', auth, addMovieToFavorites);
router.delete('/:userId/favorites/:movieId', auth, removeMovieFromFavorites);

export default router;






