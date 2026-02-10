import { NavLink } from "react-router";

export default function Header() {
  return (
    <div className=" px-9  py-2 flex items-baseline justify-between">

      <h1>Blog App</h1>

      <nav>
        <NavLink to={'/add-blog'}>Add Blog</NavLink>
      </nav>






    </div>
  )
}
