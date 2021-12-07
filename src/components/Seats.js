import PropTypes from 'prop-types'

export function Seats({seats}){

  return(
    <div>
      Numery zajętych miejsc:

      {seats.map(innerSeats => ( innerSeats.map(seat => (
        <div key={seat.row + ' ' + seat.number}>
        Rząd: {seat.row} Numer: {seat.number}
        </div>
      ))
        
      ))}
    </div>
  );
}

Seats.propTypes = {
  seats: PropTypes.node.isRequired
}