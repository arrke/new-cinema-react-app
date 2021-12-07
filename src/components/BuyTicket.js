import {useState} from 'react'
import {SeatingPlan} from './SeatingPlan'
import { makeReservation } from '../actions'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
export function BuyTicket(props){
  const{
    reservedSeats,
    screeningRoom,
    screeningId
  } = props
  const[visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  function handleBook(seats, name){
    dispatch(makeReservation(seats,screeningRoom.id,name,screeningId))
    alert("Zabookowałeś bilety z miejscami "+ seats.map(seat => `Rząd ${seat.row} Numer: ${seat.number} `))
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

BuyTicket.propTypes = {
  reservedSeats: PropTypes.node.isRequired,
  screeningRoom: PropTypes.node.isRequired,
  screeningId: PropTypes.number.isRequired
}