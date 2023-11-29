const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const movieController = require('../controllers/movieController');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/movieDetails', movieController.getAllMovies);
app.post('/api/movieDetails', movieController.insertMovie);
app.delete('/api/delete/:movieName', movieController.deleteMovie);
app.put('/api/movieDetails', movieController.updateMovieReview);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
