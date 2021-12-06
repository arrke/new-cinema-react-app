import {Link, Outlet} from 'react-router-dom'
export function NavBar(){
  return(
    <nav
    style={{
      borderBottom: "solid 1px",
      paddingBottom: "1rem"
    }}
    >
    <Link to="/">HOME</Link> |{" "}
    <Link to="/movies">Filmy</Link> |{" "}
    <Link to="/screening-rooms">Sale</Link> |{" "}
    <Link to="/repertoires">Repertuar</Link>
    <Outlet />
  </nav>

  );
}