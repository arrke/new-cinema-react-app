import PropTypes from 'prop-types'
import '../stylesheets/Movie.css'
import { useState } from 'react'
import {updateMovie} from '../api/MoviesApi'
import { ModalEditFilm } from './ModalEditFilm'

export function Movie(props){
  const id = props.id
  const[title,setTitle] = useState(props.title)
  const[runtime, setRuntime] = useState(props.runtime)
  const[img, setImg] = useState(props.img)

  const [edit,setEdit] = useState(false)
  function showMovieInformation(e){
    e.target.parentNode.lastChild.style.display = "block"
  }

  function hideMovieInformation(e){
    e.target.parentNode.lastChild.style.display = "none"
  }

  function handleSave(newTitle, newRuntime){
    updateMovie(id,newTitle, newRuntime, img).then(res => {
      console.log(res)
      setImg(res.image)
      setRuntime(res.runtime)
      setTitle(res.title)
      setEdit(prevState => !prevState)
    })
  }
  function handleSetEdit(){
    setEdit(prevState => !prevState)
  }

  function getHoursAndMinutes(time){
    var hours = (time / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " h " + rminutes + " min. "
  }
  return(
    <>
    <div className ="Movie" onMouseEnter={e=> showMovieInformation(e)}
    onMouseLeave={e=> hideMovieInformation(e)} key={title}> 
    {img?<img width="300" height="400" src={img} />:""}
    <div className="Movie_information" style={{display: "none"}}> 
      <span> Tytuł:<br/> {title} <br/></span> 
      <span> Czas trwania:<br/>  {getHoursAndMinutes(runtime)} </span>
      <button onClick={e=> {e.preventDefault(); setEdit(prevState => !prevState)}}>EDIT</button>
      <button onClick={e=> {e.preventDefault(); props.deleteThisMovie(id)}}>USUN</button>
    </div>
    </div>
    {edit?
    <ModalEditFilm key={id} title={title} image={img} runtime={runtime} save={handleSave} changeEdit={handleSetEdit}/>:
    ""}
    </>
  );
}
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  runtime: PropTypes.number.isRequired,
  img: PropTypes.string
}
