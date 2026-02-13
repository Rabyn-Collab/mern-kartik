import { NavLink } from "react-router";

export default function Header() {
  return (
    <div className=" px-9 sticky top-0 bg-black text-white  py-2 flex items-baseline justify-between">

      <h1>TMDB App</h1>

      <nav className="space-x-7">

        <NavLink to={'/popular'}>Popular</NavLink>
        <NavLink to={'/upcoming'}>Upcoming</NavLink>
        <NavLink to={'/top-rated'}>TopRated</NavLink>

      </nav>






    </div>
  )
}
