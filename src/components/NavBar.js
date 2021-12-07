import {Link, Outlet} from 'react-router-dom'
export function NavBar(){
  return(
    <nav
    style={{
      borderBottom: "solid 1px",
      paddingBottom: "1rem"
    }}
    >
    <Link className="NavLink"to="/">HOME</Link> |{" "}
    <Link className="NavLink"to="/movies">Filmy</Link> |{" "}
    <Link className="NavLink"to="/screening-rooms">Sale</Link> |{" "}
    <Link className="NavLink"to="/repertoires">Repertuar</Link>
    <Outlet />
  </nav>

  );
}