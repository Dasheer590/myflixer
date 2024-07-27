import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ name, username, email, password: hashedPassword });

      await newUser.save();
      res.status(201).json(newUser);
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
  
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'your_secret_key', { expiresIn: '1h' });
  
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error('Error logging in:', error); // Log detailed error
        res.status(500).json({ message: 'Server error' }); // Generic server error response
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = { name, email, password: hashedPassword, _id: id };

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
}

export const addUserFavorite = async (req, res) => {
  const { userId } = req.params;
  const { movieId } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (!user.favorites.includes(movieId)) {
          user.favorites.push(movieId);
          await user.save();
      }

      res.status(200).json({ message: 'Movie added to favorites' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
      const user = await User.findById(userId).populate('favorites');
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({ favorites: user.favorites });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
}

export default router;
