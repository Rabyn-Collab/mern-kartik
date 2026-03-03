import { Button } from "./ui/button.jsx";

export default function Header() {
  return (
    <div className="  px-5 py-2  flex justify-between ">

      <h1>Shop Jee</h1>

      <nav className="flex gap-7">

        <Button variant="outline" className={'bg-none'}>Login</Button>
        <Button className={'bg-blue-500'}>SignUp</Button>

      </nav>


    </div>
  )
}
