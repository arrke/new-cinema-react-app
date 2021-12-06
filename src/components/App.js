import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../stylesheets/App.css';
import {NavBar} from './NavBar';
import { Movies } from "./Movies";
import { ScreeningRooms } from "./ScreeningRooms";
import { getAllBranches } from '../api/BranchesApi';
import * as MoviesApi from '../api/MoviesApi'
import { ScreeningRoom } from './ScreeningRoom';
import {useState, useEffect} from 'react';
import { getAllRepertoire } from '../api/RepertoireApi';
import { Repertoires } from './Repertoires';
import {Repertoire} from './Repertoire'

function App() {
  const [screeningRooms, setScreenings]= useState([]);
  const [movies, setMovies]= useState([]);
  const [repertoire, setRepertoire] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getAllBranches()
        setScreenings([...response])
      } catch(err){
        console.log(err)
      }
    };
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await MoviesApi.getAllMovies()
        setMovies([...response])
      } catch(err){
        console.log(err)
      }
    };
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getAllRepertoire()
        setRepertoire([...response])
      } catch(err){
        console.log(err)
      }
    };
    fetchData()
  }, [])
  console.log(repertoire)

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
      <Route path="repertoires" element={<Repertoires list={repertoire}/>}>
        <Route path=':idRep' element={<Repertoire/>}/>
      </Route>
      
    </Routes>
    </div>
    
  </BrowserRouter>
  );
}

export default App;
