import { NavLink } from "react-router";
import { Button } from "./ui/button.jsx";
import { useSelector } from "react-redux";
import UserDropDown from "../features/user/UserDropDown.jsx";

export default function Header() {

  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="  px-5 py-2  flex justify-between ">

      <h1>Shop Jee</h1>



      {user ? <UserDropDown user={user} /> : <nav className="flex gap-7">

        <NavLink to={'/login'}>
          <Button variant="outline" className={'bg-none'}>Login</Button>
        </NavLink>

        <Button className={'bg-blue-500'}>SignUp</Button>

      </nav>}




    </div>
  )
}
