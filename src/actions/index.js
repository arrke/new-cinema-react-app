import { getAllMovies, updateMovie,addMovie, deleteMovie} from "../api/MoviesApi";
import {getAllRepertoire, addRepertoire} from '../api/RepertoireApi';
import {getAllBranches} from '../api/BranchesApi';
import { createReservedSeets } from "../api/ReservedSeatsApi";

export const fetchMoviesFromApi = () => (dispatch) => {
  return getAllMovies().then(data => {
    dispatch(moviesFetched(data));
  }).catch(error => {
    throw(error);
  });
}

export const moviesFetched = (movies) => ({
  type: 'FETCH_MOVIE_SUCCESS',
  movies,
});

export const updateMovieAction = (id,newTitle,newRuntime,img) => (dispatch) => {
  return updateMovie(id, newTitle, newRuntime, img).then(data => {
    dispatch(movieUpdated(data));
  }).catch(error => {
    throw(error);
  });
}
export const movieUpdated = (movie) => ({
  type: 'UPDATED_MOVIE',
  movie
})

export const deleteMovieAction = (id) => (dispatch) => {
  return deleteMovie(id).then(data => {
    dispatch(movieDeleted(id));
  }).catch(error => {
    throw(error);
  });
}
export const movieDeleted = (movieId) => ({
  type: 'DELETE_MOVIE',
  movieId
})

export const createMovieAction = (newTitle,newRuntime,img) => (dispatch) => {
  return addMovie(newTitle, newRuntime, img).then(data => {
    dispatch(movieCreated(data));
  }).catch(error => {
    throw(error);
  });
}

export const movieCreated = (newMovie) => ({
  type: 'CREATE_MOVIE',
  newMovie
})


export const fetchRepertoires = () => (dispatch) => {
  return getAllRepertoire().then(data => {
    dispatch(repertoireFetched(data));
  }).catch(error => {
    throw(error);
  });
}

export const repertoireFetched = (repertoires) => ({
  type: 'FETCH_REPERTOIRE_SUCCESS',
  repertoires,
});

export const makeReservation = (seats, branchId, nameAndSurname, screeningId) => (dispatch) => {
  return createReservedSeets(seats, branchId, nameAndSurname, screeningId).then(data => {
    dispatch(fetchRepertoires());
  }).catch(error => {
    throw(error);
  });
};

export const addRepertoireAction = (movieId, branchId, date, hour ) => (dispatch) => {
  return addRepertoire(movieId, branchId, date, hour ).then(data => {
    dispatch(fetchRepertoires());
  }).catch(error => {
    throw(error);
  });
}

export const fetchScreenings = () => (dispatch) => {
  return getAllBranches().then(data => {
    dispatch(screeningsFetched(data));
  }).catch(error => {
    throw(error);
  });
}

export const screeningsFetched = (screenings) => ({
  type: 'FETCH_SCREENING_SUCCESS',
  screenings,
});

