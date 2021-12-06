import PropTypes from 'prop-types'
import { ScreeningRoom } from './ScreeningRoom';
export function ScreeningRooms({screeningRooms}){
  console.log(screeningRooms)
  return(
    <div>
      {screeningRooms.map(room => (
        <ScreeningRoom key={room.name} name={room.name} seatsNo={room.seatsNo}/>
      ))}
    </div>
  );
}


ScreeningRooms.propTypes = {
  screeningRooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      seatsNo: PropTypes.number.isRequired
    })
  ).isRequired
}