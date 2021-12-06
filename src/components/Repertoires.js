import { Link, Outlet } from "react-router-dom";

export function Repertoires({list}){
  function handleDate(date){
    console.log(date)
  }

  return(
    <>
    <input type="date" onChange={e => handleDate(e.target.value)}/>
    <div style={{ display: "flex", flexDirection: 'column'}}>
    <nav
      style={{
        borderRight: "solid 1px",
        padding: "1rem",
        display: "flex", flexDirection: 'row', flexWrap: 'wrap',
        justifyContent: "space-around",
        alignItems: 'center',
        width: 100 + '%'
      }}
    >
      {list.map(repertoire => (
        <Link
          style={{ display: "block", margin: "1rem 0", width: 50+"%"}}
          to={`/repertoires/${repertoire.id}`}
          key={repertoire.id}
        >
          {repertoire.movie.id}
        </Link>
      ))}
    </nav>
    <Outlet />
    </div>
    </>
  );
}