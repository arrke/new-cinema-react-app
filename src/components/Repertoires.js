import { Link, Outlet } from "react-router-dom";
import { useState } from 'react'
import { ModalAddRepertoire } from "./ModalAddRepertoire";
import { useDispatch} from "react-redux";
import { addRepertoireAction } from "../actions";
import PropTypes from 'prop-types'

export function Repertoires({list}){
  const dispatch = useDispatch()
  console.log(list)
  function handleDate(date){
    let dateSplited = date.split(":")[0]
    let todaySplited = new Date().toISOString().split("T")[0]
    if(dateSplited[2] <= todaySplited[2] && dateSplited[1] <= todaySplited[1] && dateSplited[0] < todaySplited[0])
      alert("PODAJ POPRAWNĄ DATĘ!")
    else
      setRepo(list.filter(repertoire => (repertoire.date === date && repertoire.hour.split(":")[0] > 0)))
  }
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [visibleButton, setVisible] = useState(false)
  
  const [filteredRepertoires,setRepo] = useState(list.filter(repertoire => (repertoire.date === date && repertoire.hour.split(":")[0] > new Date().toISOString().split("T")[1].split('.')[0].split(':').slice(0,-1)[0])))
  console.log(filteredRepertoires)
  function handleSetVisible(){
    setVisible(prevState => !prevState)
  }

  function handleAddRepertoire(selectedMovieId, selectedDate, selectedTime, selectedRoom){
    dispatch(addRepertoireAction(selectedMovieId, selectedRoom, selectedDate, selectedTime))
  }

  return(
    <>
    <button onClick={e=> {e.preventDefault();handleSetVisible()}}> 
    {!visibleButton?"+":"X"} 
    </button>
    {!visibleButton?'':
     <ModalAddRepertoire key={0} save={handleAddRepertoire} changeEdit={handleSetVisible} handleSave={handleAddRepertoire}/>
    }
    <input type="date" min={new Date().toISOString().split("T")[0]} onChange={e => handleDate(e.target.value)}/>
    {filteredRepertoires.length != 0?<div style={{ display: "flex", flexDirection: 'column'}}>
    <nav
      style={{
        borderRight: "solid 1px",
        padding: "1rem",
        display: "flex", flexDirection: 'row', flexWrap: 'wrap',
        justifyContent: "space-around",
        alignItems: 'center',
        width: 100 + '%'
      }}
    >
      {filteredRepertoires.map(repertoire => (
        <Link
          style={{ margin: "1rem 0", width: 20+"%"}}
          to={`/repertoires/${repertoire.id}`}
          key={repertoire.id}
          className="LinkToRepertoire"
        >
          <span> {repertoire.movie.title} </span> <span> Dnia: {repertoire.date}</span> <span>Godz: {repertoire.hour}</span>
        </Link>
      ))}
    </nav>
    <Outlet />
    </div>:
    <div className="noSeanses">
    "Brak seansów na wybrany dzień"
    </div>}
    </>
  );
}

Repertoires.propTypes ={
  id: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
  branchId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  reserved_seats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      seats: PropTypes.arrayOf(
        PropTypes.shape({
          row: PropTypes.number.isRequired,
          number: PropTypes.number.isRequired
        })
      ),
      branchId: PropTypes.number.isRequired,
      nameAndSurname: PropTypes.string.isRequired,
      screeningId: PropTypes.number.isRequired

    })
  ),
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    runtime: PropTypes.number.isRequired,
  }),
  branch: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    seatsNo: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired
  })
}

