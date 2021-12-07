import PropTypes from 'prop-types'
import {Movie} from './Movie'
import {useState} from 'react'
import '../stylesheets/Movie.css'
import { ModalEditFilm } from './ModalEditFilm'
import { updateMovieAction,createMovieAction, deleteMovieAction } from '../actions'
import { useDispatch } from 'react-redux'
export function Movies({movies}){
  const dispatch = useDispatch();

  const [visibleButton, setVisible] = useState(false)
  function handleDodaj(title, runtime, img){
    dispatch(createMovieAction(title,runtime,img))
  }

  function deleteSpecificMovie(id){
    dispatch(deleteMovieAction(id))
  }

  function handleSetVisible(){
    setVisible(prevState => !prevState)
  }

  function handleSave(id,newTitle, newRuntime,image){
    dispatch(updateMovieAction(id,newTitle, newRuntime,image))
  }

  return(
    <>
    <button className="AddMovie" onClick={e => {e.preventDefault();handleSetVisible()}}>
      {!visibleButton?"+":"x"}
    </button>
    {!visibleButton?'':
     <ModalEditFilm key={0} save={handleDodaj} changeEdit={handleSetVisible} />
    }

    <div className= "Movies">
      {movies.map(movie=>(
        <Movie 
        key={movie.id} 
        id={movie.id} 
        title={movie.title}
        runtime={movie.runtime}
        img={movie.image} 
        deleteThisMovie={deleteSpecificMovie}
        handleSave={handleSave}/>
      ))}
    </div>
    </>
  );
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      fullTitle: PropTypes.string,
      year: PropTypes.number.isRequired,
      image: PropTypes.string,
      crew: PropTypes.string,
      runtime: PropTypes.string.isRequired
    })
  ).isRequired
}