const validateInputs = (movieName, movieReview) => {
    const errors = {};
  
    if (!movieName.trim()) {
      errors.movieName = 'Movie Name cannot be empty';
    }
  
    if (!movieReview.trim()) {
      errors.movieReview = 'Movie Review cannot be empty';
    }
    
    else if (!/^\D+$/.test(movieReview)) {
      errors.movieReview = 'Movie Review should not contain only numbers';
    } 
    
    else if (movieReview.length < 3) {
      errors.movieReview = 'Movie Review should be at least 3 characters long';
    }
  
    return errors;
  };
  
  export default validateInputs;
  