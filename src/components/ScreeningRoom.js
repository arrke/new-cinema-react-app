import {PropTypes} from 'prop-types'

export function ScreeningRoom({name, seatsNo}){
  return(
    <div className="ScreeningRoom">
      Nazwa salki: {name}<br/>
      Ilosc miejsc: {seatsNo}
    </div>
  );
}

ScreeningRoom.propTypes = {
  name: PropTypes.string.isRequired,
  seatsNo: PropTypes.number.isRequired
}