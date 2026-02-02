import { useSelector } from "react-redux"
import { Button } from "../../components/ui/button.jsx";
import { EditIcon, TrashIcon } from "lucide-react";

export default function Home() {

  const { todos } = useSelector((state) => state.todoSlice);

  console.log(todos);

  return (
    <div className="grid gap-5 grid-cols-3 p-5">
      {todos.map((todo) => (
        <div key={todo.id} className="shadow-xs p-3">

          <h1>{todo.email}</h1>
          <p>{todo.gender}</p>
          <h3>{todo.country}</h3>

          <div className="mt-3 flex gap-5">
            <Button variant="outline"> <EditIcon /> </Button>
            <Button variant="outline"> <TrashIcon /> </Button>
          </div>


        </div>
      ))}
    </div>
  )
}
