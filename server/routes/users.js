import express from 'express';
import { registerUser, updateUser, loginUser, deleteUser, addUserFavorite, getUserFavorites } from '../controllers/users.js';

const router = express.Router();

router.get('/:userId/favorites', getUserFavorites);
router.post('/:userId/favorites', addUserFavorite);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;








