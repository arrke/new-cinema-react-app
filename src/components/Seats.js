import { useState,useEffect } from "react";
import { getSeetsByIds } from "../api/SeatsApi";
export function Seats({seats}){

  return(
    <div>
      Numery zajętych miejsc: 
      {seats.map(seat => (
        <div key={seat.row + ' ' + seat.number}>
          Rząd: {seat.row} Numer: {seat.number}
        </div>
      ))}
    </div>
  );
}