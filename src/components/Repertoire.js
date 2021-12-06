import { Movie } from "./Movie";
import { ScreeningRoom } from './ScreeningRoom'
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom";
import {getRepertoireById} from '../api/RepertoireApi'
import {Seats} from './Seats'
import { BuyTicket } from "./BuyTicket";


export function Repertoire(){
  
  let params = useParams();
  const [repertoire, setRepertoire] = useState([])

  let id = params.idRep
  console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      try{
        if(!params.idRep)
          throw new Error('PARAM INVALID')
        const response = await getRepertoireById(params.idRep)
        setRepertoire(response[0])
      } catch(err){
        console.log(err)
      }
    };
    fetchData(params.idRep)
  }, params.idRep)

  const getAvailableSeats = () =>{
    return repertoire.branch.seatsNo - repertoire.reserved_seats.length
  }
  console.log(repertoire)
  return(
    <div>
      {repertoire.length != 0?
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
              <Seats seats={repertoire.reserved_seats.map(e=>{return e.seat})}/>
              :
              ''
            }
  
            {getAvailableSeats() !== 0?
              <BuyTicket key={repertoire.id} movie={repertoire.movie} reservedSeats={repertoire.reserved_seats} screeningRoom= {repertoire.branch}/> 
            :
            <div> 
              Bilety wyprzedane
            </div>}
      </div>
      :'Loading'}
    </div>
  );
}