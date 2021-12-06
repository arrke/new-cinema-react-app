import PropTypes from 'prop-types'
import {Movie} from './Movie'
import {useState} from 'react'
import '../stylesheets/Movie.css'
import { deleteMovie, addMovie } from '../api/MoviesApi'
import { ModalEditFilm } from './ModalEditFilm'
export function Movies({movies}){
  const [visibleButton, setVisible] = useState(false)
  function handleDodaj(title, runtime, img){
    // e.preventDefault()
    // if(document.getElementById("alert_nazwa").innerHTML === "" && 
    // document.getElementById("alert_czas").innerHTML === "" &&
    // document.getElementById("alert_src").innerHTML === '' 
    // ){
    //   const title = document.getElementById("title").value
    //   const runtime = document.getElementById("time").value
    //   const img = document.getElementById("img").value
    //   if(title && runtime && img){
    //   }
    // }
    addMovie(movies.length+2,title,runtime,img).then(res => movies= [...movies, res])
  }

  // function checkTime(time){
  //   if(time <= 30){
  //     document.getElementById("alert_czas").innerHTML = "Czas musi być większy niż 30 minut"
  //   }
  //   else if (time > 300){
  //     document.getElementById("alert_czas").innerHTML = "Czas musi być mniejszy niż 300 minut"
  //   }
  //   else{
  //     document.getElementById("alert_czas").innerHTML = ""
  //   }
  // }

  // function checkTitle(title){
  //   if(title.length <= 1 || title.split(' ').join('').length <= 1){
  //     document.getElementById("alert_nazwa").innerHTML = "Nazwa musi być dłuższa niż jeden znak"
  //   }
  //   else if(title.charAt(0) !== title.charAt(0).toUpperCase() && !isNaN(title.charAt(0))){
  //     document.getElementById("alert_nazwa").innerHTML = "Tytuł musi zaczynać się z wielkiej litery lub cyfry"
  //   }
  //   else{
  //     document.getElementById("alert_nazwa").innerHTML = ""
  //   }
  // }

  // function checkImgSrc(src){
  //   if(src.match(/\.(jpeg|jpg|gif|png)$/) === null){
  //     document.getElementById("alert_src").innerHTML='Nieprawidlowy link do zdjecia'
  //   }
  //   else{
  //     document.getElementById("alert_src").innerHTML =""
  //   }
  // }

  function deleteSpecificMovie(id){
    deleteMovie(id).then(res=> console.log(res))
  }

  function handleSetVisible(){
    setVisible(prevState => !prevState)
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
        <Movie key={movie.id} id={movie.id} title={movie.title} runtime={movie.runtime} img={movie.image} deleteThisMovie={deleteSpecificMovie}/>
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