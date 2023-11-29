const movieModel = require('../Models/movieModel');

const getAllMovies = (req, res) => {
    movieModel.getAllMovies((err, result) => {
        res.send(result);
    });
};

const insertMovie = (req, res) => {
    const { movieName, movieReview } = req.body;

  
    if (movieName === '') {
        return res.status(400).json({ status: 400, message: 'Movie Name should not be empty' });
    } else if (movieReview === '') {
        return res.status(400).json({ status: 400, message: 'Movie Review should not be empty' });
    }

    if (movieReview.length < 3) {
        return res.status(400).json({ status: 400, message: 'Movie Review should be at least 3 characters long' });

    }


    movieModel.insertMovie(movieName, movieReview, (err, result, insertedData) => {
        const statusCode = err ? 500 : 200;
        res.status(statusCode).json({ status: statusCode, message: err ? 'error' : 'success', data: insertedData });
    });
};

const deleteMovie = (req, res) => {
    const movieName = req.params.movieName;
    movieModel.deleteMovie(movieName, (err, result) => {
        res.send(result);
    });
};

const updateMovieReview = (req, res) => {
    const { movieName, movieReview } = req.body;
    movieModel.updateMovieReview(movieName, movieReview, (err, result) => {
        res.send(result);
    });
};

module.exports = { getAllMovies, insertMovie, deleteMovie, updateMovieReview };
