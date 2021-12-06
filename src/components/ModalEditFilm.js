export function ModalEditFilm({title,runtime,image,save, changeEdit}){
  function handleSave(e){
    e.preventDefault()
    const newTitle = document.getElementById("newTitle").value;
    const newRuntime = Number(document.getElementById("newRuntime").value);
    const img = document.getElementById("img").value
    save(newTitle, newRuntime, img)

    if(document.getElementById("alert_nazwa").innerHTML === "" && 
    document.getElementById("alert_czas").innerHTML === "" &&
    document.getElementById("alert_src").innerHTML === '' 
    ){
      const title = document.getElementById("newTitle").value
      const runtime = document.getElementById("newRuntime").value
      const img = document.getElementById("img").value
      if(title && runtime && img){
        save(newTitle, newRuntime, img)
      }
    }
  }

  function checkTime(time){
    if(time <= 30){
      document.getElementById("alert_czas").innerHTML = "Czas musi być większy niż 30 minut"
    }
    else if (time > 300){
      document.getElementById("alert_czas").innerHTML = "Czas musi być mniejszy niż 300 minut"
    }
    else{
      document.getElementById("alert_czas").innerHTML = ""
    }
  }

  function checkTitle(title){
    if(title.length <= 1 || title.split(' ').join('').length <= 1){
      document.getElementById("alert_nazwa").innerHTML = "Nazwa musi być dłuższa niż jeden znak"
    }
    else if(title.charAt(0) !== title.charAt(0).toUpperCase() && !isNaN(title.charAt(0))){
      document.getElementById("alert_nazwa").innerHTML = "Tytuł musi zaczynać się z wielkiej litery lub cyfry"
    }
    else{
      document.getElementById("alert_nazwa").innerHTML = ""
    }
  }

  function checkImgSrc(src){
    if(src.match(/\.(jpeg|jpg|gif|png)$/) === null){
      document.getElementById("alert_src").innerHTML='Nieprawidlowy link do zdjecia'
    }
    else{
      document.getElementById("alert_src").innerHTML =""
    }
  }

  return(
    <div className="Modal_Edit">
      <button onClick={e=> {e.preventDefault(); changeEdit()}}>Close</button>
      <br/> 
      <div className="Modal_Edit_Form">
      Nazwa filmu: <input type="text" id="newTitle" placeholder={title?title:''} onChange={e => checkTitle(e.target.value)}/><br/>
      <div id="alert_nazwa" className="alert"></div>
      Czas trwania w minutach: <input type="text" placeholder={runtime?runtime:''} id="newRuntime" onChange={e => checkTime(e.target.value)}/><br/>
      <div id="alert_czas" className="alert"></div>
      Sciezka do img: <input type="text" id="img" placeholder={image?image:''} onChange={e => checkImgSrc(e.target.value)}/><br/>
      <div id="alert_src" className="alert"></div>
      <button className="Modal_zapisz" onClick={e => handleSave(e)}> Zapisz </button>
      </div>
    </div>
  );
}