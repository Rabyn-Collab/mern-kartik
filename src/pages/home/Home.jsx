import { NavLink, Outlet } from "react-router";
import Header from "../../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>This is Home Page</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores totam adipisci labore odit ab dolorem? Nisi, in tempora quis, itaque voluptatibus nostrum ipsa beatae odio magni iure commodi sapiente autem?</p>
      <NavLink to={'/page1'}>Page1</NavLink>
      <NavLink to={'/page2'}>Page2</NavLink>

      <Outlet />
    </div>
  )
}
