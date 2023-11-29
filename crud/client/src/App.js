import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import validateInputs from './validateInputs';

function App() {
  const [movieName, setmovieName] = useState('');
  const [movieReview, setmovieReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [updateReview, setupdateReview] = useState('');
  const [errors,setErrors]=useState({})

  useEffect(() => {
    axios.get('http://localhost:3001/api/movieDetails')
      .then((response) => {
        setReviewList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, []);

  const submitReview = () => {

    const validationErrors = validateInputs(movieName, movieReview);

    if(Object.keys(validationErrors).length===0){

    axios.post('http://localhost:3001/api/movieDetails', {
      movieName: movieName,
      movieReview: movieReview,
    })
      .then(() => {
        setReviewList([...reviewList, { movieName, movieReview }]);
        setmovieName('');
        setmovieReview('');
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  }
  else{
      setErrors(validationErrors)
  }
}


  const deleteReview = (movieName) => {
    axios.delete(`http://localhost:3001/api/delete/${movieName}`)
      .then(() => {
        setReviewList(reviewList.filter((review) => review.movieName !== movieName));
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };

  const reviewUpdater = (movieName) => {
    axios.put('http://localhost:3001/api/movieDetails', {
      movieName: movieName,
      movieReview: updateReview,
    })
      .then(() => {
        setReviewList(reviewList.map((review) =>
          review.movieName === movieName ? { ...review, movieReview: updateReview } : review
        ));
        setupdateReview('');
      })
      .catch((error) => {
        console.error('Error updating review:', error);
      });
  };

  return (
    <>
      <div className="App">
        <h1>CRUD APP</h1>
        <div className='form'>
          <label>Movie Name: </label>
          <input type='text' name='moviename' value={movieName} onChange={(event) => { setmovieName(event.target.value) }}></input>
          <p style={{ color: 'red' }}>{errors.movieName}</p>
          <label>Review: </label>
          <input type='text' name='review' value={movieReview} onChange={(event) => { setmovieReview(event.target.value) }}></input>
          <p style={{ color: 'red' }}>{errors.movieReview}</p>
          <button onClick={submitReview}>submit</button>
          {
            reviewList.map((each) => {
              return (
                <div key={each.movieName} className='card'>
                  <h1>{each.movieName}</h1>
                  <p>Movie Review: {each.movieReview}</p>
                  <button onClick={() => { deleteReview(each.movieName) }}>Delete</button>
                  <input id='updateInput' type='text' onChange={(event) => { setupdateReview(event.target.value) }}></input>
                  <button onClick={() => { reviewUpdater(each.movieName) }}>Update</button>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;

