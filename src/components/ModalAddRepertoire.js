import { useSelector } from "react-redux";
import {useState,useEffect} from 'react'
import { useDispatch } from "react-redux";
import { fetchRepertoires, fetchScreenings } from "../actions";
import PropTypes from 'prop-types'

export function ModalAddRepertoire(props){
  const movies = useSelector(state => state.movies)
  const repertoires = useSelector(state => state.repertoires)
  const screeningRooms = useSelector(state => state.screenings);

  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try{
        if(repertoires === undefined)
          dispatch(fetchRepertoires())
        if(screeningRooms === undefined)
          dispatch(fetchScreenings())
      } catch(err){
        console.log(err)
      }
    };
    fetchData()
  }, [])

  console.log(repertoires)
  const [selectedMovieId,setMovie] = useState(0)
  const [selectedDate,setDate] = useState(0)
  const [selectedTime,setTime] = useState(0)
  const [selectedRoom,setRoom] = useState(0)

  function handleDate(date){
    document.getElementById('alert_date').innerHTML = ''
    if(new Date(date).getTime() < new Date().getTime())
      document.getElementById('alert_date').innerHTML = 'Popraw date. Data nie może być mniejsza niż dzisiejsza.'
    else setDate(date)
  }

  function smallerThan(time, than){
    let timeS = time.split(":")
    return Number(timeS[0]) < Number(than)
  }

  function biggerThan(time, than){
    let timeS = time.split(":")
    return Number(timeS[0]) > Number(than)
  }

  function handleTime(time){
    document.getElementById('alert_time').innerHTML = ''
    if(smallerThan(time, 10) || biggerThan(time, 23))
      document.getElementById('alert_time').innerHTML = "Popraw czas. Kino pracuje od 10 do 23"
    else
      setTime(time)
  }
  
  function handleRoom(branchId){
    setRoom(branchId)
  }

  function getTime(time, runtime){
    let timeSplited = time.split(":")
    let hours = (runtime / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    timeSplited[0] = Number(timeSplited[0]) + +rhours
    timeSplited[1] = Number(timeSplited[1]) + +rminutes
    if(timeSplited[1].toString().length == 1){
      timeSplited[1] = timeSplited[1].toString()+0
    }
    console.log(timeSplited.join(':'))
    return timeSplited.join(':')
  }
  function compareTime(time1,time2){
    let timeFrom = time1.split(":")
    let timeTo = time2.split(":")
    if(Number(timeFrom[0]) >= Number(timeTo[0])){
      return true
    }
    else if(Number(timeFrom[1]) >= Number(timeTo[1])){
      return true
    }
    else return false
  }

  function lockedRoom(){
    return repertoires.filter(screening => {
      if(screening.date == selectedDate && (
        screening.hour === selectedTime || (compareTime(getTime(screening.hour,screening.movie.runtime),selectedTime)))){
          return screening;
        }
    }).map(screening=>screening.branchId)
  }

  function isFreeRooms(ids){
    let array = screeningRooms.filter(value => ids.includes(value.id))
    if(array.length != 0){
      return array
    }
    else{
      return screeningRooms
    }
  }

  return(
    <div className="ModalAddRepertoire">
      <button onClick={props.changeEdit}> CLOSE </button>
      <div>
        <h1> Tworzenie nowego seansu </h1>
        <hr/>
        Wybierz który film chciałbyś dodać do seansu:
        <select name="movie" onChange={e=> setMovie(e.target.value)}>
          {movies.map(movie => (
            <option value={movie.id}>
              {movie.title}
            </option>
          ))})
        </select><br/><br/>
        {selectedMovieId == 0? '':
        <div>
        Wybierz datę, kiedy chcesz puścić film w kinie:
        <input type="date" id="date" min={new Date().toISOString().substring(0, 10)} onChange={e=> handleDate(e.target.value)}/>
        <div className="alert" id="alert_date"> </div>
        </div>
        }
        
        <br/>
        {selectedDate === 0?'':
        <div>
          Wybierz odpowiedni czas, kiedy puścić film:
          <input type="time" id="time" min="10:00" max="22:00" onChange={e=> handleTime(e.target.value) } /><br/>
          <div className="alert" id="alert_time"> </div>
        </div>
        }

        {
          selectedDate != 0 && selectedTime != 0 && lockedRoom() && isFreeRooms(lockedRoom())?
          <div>
            Wybierz sale do zajęcia na seans: 
            <select name="branch" onChange={e=> handleRoom(e.target.value)}>
              {isFreeRooms(lockedRoom()).map(freeRoom => (
                <option value={freeRoom.id}> {freeRoom.name} </option>
              ))}
            </select>
          </div>
          :<div className="information">
            Przykro nam, ale nie możesz stworzyć seansu w danej godzinie w tym dniu. Wybierz inny termin.
          </div>
        }
        {
          selectedDate != 0 && selectedTime != 0 && selectedRoom != 0 && selectedMovieId != 0?
          <button onClick={e => {e.preventDefault();props.handleSave(selectedMovieId, selectedDate, selectedTime, selectedRoom)}}> Dodaj seans </button> :''
        }
        
      </div>
    </div>
  );
}

ModalAddRepertoire.propTypes = {
  handleSave: PropTypes.func.isRequired,
  changeEdit: PropTypes.func.isRequired
}
