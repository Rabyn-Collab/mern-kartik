import { useSelector } from "react-redux"

export default function Home() {

  const { todos } = useSelector((state) => state.todoSlice);

  console.log(todos);

  return (
    <div>Home</div>
  )
}
