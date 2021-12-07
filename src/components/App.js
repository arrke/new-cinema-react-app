import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../stylesheets/App.css';
import {NavBar} from './NavBar';
import { Movies } from "./Movies";
import { ScreeningRooms } from "./ScreeningRooms";
import { ScreeningRoom } from './ScreeningRoom';
import { useEffect} from 'react';
import { Repertoires } from './Repertoires';
import {Repertoire} from './Repertoire'
import {fetchMoviesFromApi, fetchRepertoires, fetchScreenings} from '../actions'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const movies = useSelector(state => state.movies)
  const screeningRooms = useSelector(state => state.screenings);
  const repertoires = useSelector(state => state.repertoires)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try{
        dispatch(fetchScreenings())
        dispatch(fetchMoviesFromApi())
        dispatch(fetchRepertoires())
      } catch(err){
        console.log(err)
      }
    };
    fetchData()
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
    <NavBar/>
    <Routes>
      <Route path="/"/>
      <Route path="movies" element={<Movies movies={movies}/>} />
      <Route path="screening-rooms" element={<ScreeningRooms screeningRooms={screeningRooms}/>} >
        <Route path=":screeningId" element={<ScreeningRoom />} />
      </Route>
      <Route path="repertoires" element={<Repertoires list={repertoires}/>}>
        <Route path=':idRep' element={<Repertoire/>}/>
      </Route>
      
    </Routes>
    </div>
    
  </BrowserRouter>
  );
}

export default App;
