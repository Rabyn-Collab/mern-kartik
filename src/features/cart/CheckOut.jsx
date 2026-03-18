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
import { useCreateOrderMutation } from "../order/orderApi.js"
import { Spinner } from "../../components/ui/spinner.jsx";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice.js";

export default function CheckOut({ cart, total }) {
  const { user } = useSelector((state) => state.userSlice);
  const [addOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  const handleOrder = async () => {
    try {
      await addOrder({
        token: user.token,
        data: {
          totalAmount: total,
          products: cart.map((item) => ({ productId: item.id, quantity: item.qty }))

        }
      }).unwrap();
      dispatch(clearCart());
      toast.success('Order placed successfully');

    } catch (err) {
      toast.error(err?.data?.message);

    }

  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading} className="w-full">
          {isLoading ? <Spinner /> : "Checkout"}
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
          <AlertDialogAction onClick={handleOrder}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}



