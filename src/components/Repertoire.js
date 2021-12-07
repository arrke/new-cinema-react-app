import { Movie } from "./Movie";
import { ScreeningRoom } from './ScreeningRoom'
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { fetchRepertoires } from "../actions";
import { useEffect } from "react";
import {Seats} from './Seats'
import { BuyTicket } from "./BuyTicket";


export function Repertoire(){
  
  let params = useParams();
  const repertoires = useSelector(state => state.repertoires)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try{
        if(repertoires === undefined)
          dispatch(fetchRepertoires())
      } catch(err){
        console.log(err)
      }
    };
    fetchData()
  }, [])
  
  const repertoire = repertoires.find(rep => rep.id == params.idRep)

  const getAvailableSeats = () =>{
    console.log(repertoire.reserved_seats)
    return repertoire.branch.seatsNo - repertoire.reserved_seats.map(y => y.seats.map(seats => seats.size)).map(elem => elem.length).reduce((p,n) => p+n)
  }
  return(
    <div>
      {repertoire?
       <div style={{
        border: "solid 1px",
        paddingBottom: "1rem"
      }}>
            Film: <Movie title={repertoire.movie.title} runtime={repertoire.movie.runtime}/> <br/>
            Data: {repertoire.date}, Godzina: {repertoire.hour}
            Liczba sprzedanych biletów: {repertoire.reserved_seats.length}<br/>
            Liczba dostępnych biletów: {getAvailableSeats()}<br/>
            Sala: <ScreeningRoom name={repertoire.branch.name} seatsNo={repertoire.branch.seatsNo}/>
            
            {repertoire.reserved_seats.map(e=>{return e.seatId}).length !== 0?
              <Seats seats={repertoire.reserved_seats.map(e=>{return e.seats})}/>
              :
              ''
            }
  
            {getAvailableSeats() !== 0?
              <BuyTicket key={repertoire.id} screeningId = {repertoire.id} reservedSeats={repertoire.reserved_seats} screeningRoom= {repertoire.branch}/> 
            :
            <div> 
              Bilety wyprzedane
            </div>}
      </div>
      :'Loading'}
    </div>
  );
}