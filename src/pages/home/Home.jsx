import { useSelector } from "react-redux"
import { Button } from "../../components/ui/button.jsx";
import { EditIcon } from "lucide-react";
import DeleteTodo from "../todos/DeleteTodo.jsx";
import { useNavigate } from "react-router";

export default function Home() {


  const nav = useNavigate();

  const { todos } = useSelector((state) => state.todoSlice);

  return (
    <div className="grid gap-5 grid-cols-3 p-5">
      {todos.map((todo) => (
        <div key={todo.id} className="shadow-xs p-3">

          <h1>{todo.email}</h1>
          <p>{todo.gender}</p>
          <h3>{todo.country}</h3>

          <div className="mt-3 flex gap-5">
            <Button
              onClick={() => nav(`/update-todo/${todo.id}`)}
              variant="outline"> <EditIcon /> </Button>
            <DeleteTodo id={todo.id} />

          </div>


        </div>
      ))}
    </div>
  )
}
