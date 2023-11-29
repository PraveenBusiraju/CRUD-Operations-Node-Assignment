const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'praveen',
    database: 'crud_schema'
});

const getAllMovies = (callback) => {
    const sqlSelect = "SELECT * FROM crud_table;";
    db.query(sqlSelect, (err, result) => {
        callback(err, result);
    });
};

const insertMovie = (movieName, movieReview, callback) => {
    const sqlInsert = "INSERT INTO crud_table (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        const insertedData = { movieName, movieReview };
        callback(err, result, insertedData);
    });
};

const deleteMovie = (movieName, callback) => {
    const sqlDelete = "DELETE FROM crud_table WHERE movieName = ?";
    db.query(sqlDelete, movieName, (err, result) => {
        callback(err, result);
    });
};

const updateMovieReview = (movieName, review, callback) => {
    const sqlUpdate = "UPDATE crud_table SET movieReview=? WHERE movieName = ?";
    db.query(sqlUpdate, [review, movieName], (err, result) => {
        callback(err, result);
    });
};

module.exports = { getAllMovies, insertMovie, deleteMovie, updateMovieReview };
