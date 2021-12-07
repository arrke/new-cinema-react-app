import { useState, useEffect } from "react";
import PropTypes from 'prop-types'


export function SeatingPlan(props){
  const{
    reservedSeats,
    handleBook,
    screeningRoom
  } = props
  const [pickedSeats, setSeats] = useState([]);
  const [name, setName] = useState('')
  function handlePickedSeats(e){
    let x = {
      number: Number(e.target.id),
      row: Number(e.target.parentNode.id)
    }
    if(e.target.className.includes('number_avaible')){
      e.target.className = 'number number_picked'
      setSeats(oldArray => [...oldArray, x])
      return
    }
    else if(e.target.className.includes('number_picked')){
      e.target.className = 'number number_avaible'
      setSeats(pickedSeats.filter(item => !(item.row === x.row && item.number === x.number)))
      return
    }
  }

  function handleName(name){
    let splitedName = name.split(' ')

    document.getElementById('alert').innerHTML = ''
    if(splitedName.length !== 2 || !splitedName[1].length){
      document.getElementById("alert").innerHTML="Proszę o podanie poprawnych danych"
    }
    if(splitedName[0].length < 1){
      document.getElementById("alert").innerHTML="Imie musi mieć więcej niż 1 literę"
    }
    else if(splitedName[1] && splitedName[1].length < 1){
      document.getElementById("alert").innerHTML="Nazwisko musi mieć więcej niż 1 literę"
    }
    if(document.getElementById('alert').innerHTML){
      return
    }
    setName(name)
  }
  function bookSeats(e){
    e.preventDefault()
    if(name && pickedSeats && !document.getElementById("alert").innerHTML){
      handleBook(pickedSeats, name)
    }
  }

  function getNumbersInRows(){
    return Number(screeningRoom.seatsNo) / Number(screeningRoom.rows)
  }

  function getSeats(){
    let array = reservedSeats.map(innerArray => innerArray.seats.map(seats => seats))
    let returning = []
    array.forEach (innerArray => innerArray.forEach(element => returning.push(element)))
    return returning
  }
  
  const seats = getSeats()
  return(
    <>
    <div className="Screen"/>
    <div>
      {Array(screeningRoom.rows).fill().map((_, i) => i+1).map(row => (
        <div id={row} className="row">
          RZĄD {row}
          {Array(getNumbersInRows()).fill().map((_, i) => i+1).map(number => (
            <div id={number} className={`number number_${seats.find(e => 
              (e.row === row && e.number === number)
            )?'reserved':'avaible'}`}
            onClick={(e) => handlePickedSeats(e)}
            >
              {number}
            </div>
          ))}
          </div>
      ))}

      {pickedSeats.length !== 0 ? 
        <div>
          Podaj imię i nazwisko: <input type="text" name="name" onChange={e=>handleName(e.target.value)}/>
          <div id="alert">
          </div>
          <br/>
          <button onClick={e => bookSeats(e)} > ZAREZERWUJ </button><br/>
          Wybrane miejsca:
          {pickedSeats.map((seat, index) => (
            <div key={index} >
              Rząd: {seat.row} Numer: {seat.number}
            </div>
          ))}
          
        </div>:''}
    </div>
    </>
  );
}

SeatingPlan.propTypes ={
  reservedSeats: PropTypes.node.isRequired,
  handleBook: PropTypes.node.isRequired,
  screeningRoom:  PropTypes.node.isRequired
}