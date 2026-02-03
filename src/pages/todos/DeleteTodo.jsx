import { TrashIcon } from "lucide-react";
import { Button } from "../../components/ui/button.jsx";
import { useDispatch } from "react-redux";
import { removeTodo } from "./todoSlice.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DeleteTodo({ id }) {


  const dispatch = useDispatch();
  const handleDelete = () => {

    dispatch(removeTodo(id));

  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button


          variant="outline"> <TrashIcon /> </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
          >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}
