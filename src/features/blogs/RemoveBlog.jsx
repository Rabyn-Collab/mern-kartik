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
import { Button } from "@/components/ui/button"
import { useRemoveBlogMutation } from "./blogApi.js"
import { toast } from "sonner";
import { Spinner } from "../../components/ui/spinner.jsx";
export default function RemoveBlog({ id }) {

  const [removeBlog, { isLoading }] = useRemoveBlogMutation();
  const handleRemove = async () => {
    try {

      await removeBlog(id).unwrap();
      toast.success('Blog removed successfully');

    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading} variant={'outline'}>
          {isLoading ? <Spinner /> : 'Remove'}
        </Button>
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
            onClick={handleRemove}
          >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
