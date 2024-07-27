import express from 'express';
import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import User from '../models/user.js';

const router = express.Router();

// controllers/movies.js
export const getMovies = async (req, res) => {
  const { page = 1, limit = 10, title, genre, director } = req.query;
  
  const query = {};
  if (title) query.title = new RegExp(title, 'i');
  if (genre) query.genre = new RegExp(genre, 'i');
  if (director) query.director = new RegExp(director, 'i');

  try {
    const movies = await Movie.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Movie.countDocuments(query);
    
    res.status(200).json({
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
  
export const getMovie = async (req, res) => {
  const { title } = req.params;
  try {
    const movie = await Movie.findOne({ title: new RegExp('^' + title + '$', 'i') });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGenre = async (req, res) => {
    const { name } = req.params;
    try {
        const genre = await Movie.findOne({ genres: name }, { genres: 1, _id: 0 });
        res.status(200).json(genre);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDirector = async (req, res) => {
    const { name } = req.params;
    try {
        const director = await Movie.findOne({ directors: name }, { directors: 1, _id: 0 });
        res.status(200).json(director);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addMovieToFavorites = async (req, res) => {
  const { userId, movieId } = req.params;

  try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });

      if (user.favorites.includes(movieId)) {
          return res.status(400).json({ message: 'Movie already in favorites' });
      }

      user.favorites.push(movieId);
      await user.save();

      res.status(200).json({ message: 'Movie added to favorites', favorites: user.favorites });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const removeMovieFromFavorites = async (req, res) => {
    const { userId, movieId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.favorites.includes(movieId)) {
            return res.status(400).json({ message: 'Movie not in favorites' });
        }

        user.favorites = user.favorites.filter(favMovieId => favMovieId.toString() !== movieId);
        await user.save();

        res.status(200).json({ message: 'Movie removed from favorites', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMovie = async (req, res) => {
    const movie = req.body;

    const newMovie = new Movie(movie);

    try {
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
