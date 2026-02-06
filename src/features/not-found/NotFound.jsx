import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div className="p-5">

      <h1 className="text-xl text-red-400">Page Not Found</h1>
      <NavLink to={'/'} className={'underline'}>please go back</NavLink>
    </div>
  )
}
