import { combineReducers } from 'redux';
import { movies } from './movies';
import {repertoires} from './repertoires'
import {screenings} from './screenings'

export default combineReducers({
  movies, repertoires, screenings
});

export const allReducers = combineReducers({movies, repertoires, screenings})