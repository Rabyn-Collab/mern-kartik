import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { base } from "../../app/mainApi.js";
import { removeCart, setCart } from "./cartSlice.js";



export default function CartPage() {
  const { cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleIncrement = (item) => {
    dispatch(setCart({ ...item, qty: item.qty + 1 }))
  }

  const handleDecrement = (item) => {
    dispatch(setCart({ ...item, qty: item.qty - 1 }))
  }



  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex gap-4 items-center p-4">

                <img
                  src={`${base}/${item.image}`}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-1">

                  <h2 className="font-semibold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-muted-foreground">
                    Rs {item.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock: {item.stock}
                  </p>

                  {/* Qty */}
                  <div className="flex items-center gap-2 mt-3">

                    <Button
                      disabled={item.qty === 1}
                      onClick={() => handleDecrement(item)}
                      size="icon" variant="outline">
                      <Minus />
                    </Button>

                    <span className="px-3">{item.qty}</span>

                    <Button
                      disabled={item.qty === item.stock}
                      onClick={() => handleIncrement(item)}
                      size="icon" variant="outline">
                      <Plus />
                    </Button>

                  </div>
                </div>

                {/* Remove */}
                <Button
                  onClick={() => dispatch(removeCart(item.id))}
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 size={18} />
                </Button>

              </CardContent>
            </Card>
          ))}

        </div>

        {/* Order Summary */}
        <Card className="h-fit">
          <CardContent className="p-6 space-y-4">

            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs {total}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>

            <Button className="w-full">
              Checkout
            </Button>

          </CardContent>
        </Card>

      </div>

    </div>
  )
}