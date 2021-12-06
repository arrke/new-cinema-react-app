import { useParams } from 'react-router';
import {useState, useEffect} from 'react'
import {SeatingPlan} from './SeatingPlan'
import { getReservedSeetsById } from '../api/ReservedSeatsApi';

export function BuyTicket(props){
  const{
    reservedSeats,
    movie,
    screeningRoom
  } = props
  const[visible, setVisible] = useState(false)
  function handleBook(seats, name){
    console.log(seats,name, movie.title, screeningRoom.id, screeningRoom.name)
  }

  function handleVisible(){
    setVisible(!visible)
  }
  return(
    <div>
      <button onClick={e=>handleVisible()}>
        {!visible?"KUP BILETY!":"X"}
      </button>
      {visible?
      <SeatingPlan reservedSeats = {reservedSeats} handleBook={handleBook} screeningRoom={screeningRoom} />
      :
      ''}
    </div>
  );
}