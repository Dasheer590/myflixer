import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    num_mflix_comments: Number,
    poster: String,
    title: String,
    fullplot: String,
    languages: [String],
    released: Date,
    directors: [String],
    writers: [String],
    awards: {
        wins: Number,
        nominations: Number,
        text: String,
    },
    lastupdated: String,
    year: Number,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number,
    },
    countries: [String],
    type: String,
    tomatoes: {
        viewer: {
            rating: Number,
            numReviews: Number,
        },
        production: String,
        lastUpdated: Date,
    },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;

