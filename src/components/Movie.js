import PropTypes from 'prop-types'
import '../stylesheets/Movie.css'
import { useState } from 'react'
import { ModalEditFilm } from './ModalEditFilm'
export function Movie(props){

  const{
    id, 
    title, runtime, img, handleSave
  } = props

  const [edit,setEdit] = useState(false)
  function showMovieInformation(e){
    e.target.parentNode.lastChild.style.display = "block"
  }

  function hideMovieInformation(e){
    e.target.parentNode.lastChild.style.display = "none"
  }

  function handleSetEdit(){
    setEdit(prevState => !prevState)
  }

  function save(newTitle, newRuntime, image){
    handleSave(id, newTitle, newRuntime, image)
  }

  function getHoursAndMinutes(time){
    const hours = (time / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
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
    <ModalEditFilm key={id} title={title} image={img} runtime={runtime} save={save} changeEdit={handleSetEdit}/>:
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
