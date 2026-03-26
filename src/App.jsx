import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./features/home/Home.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import UserProfile from "./features/user/UserProfile.jsx";
import AdminPage from "./features/admin/AdminPage.jsx";
import Add from "./features/admin/form/Add.jsx";
import Edit from "./features/admin/form/Edit.jsx";
import ProductDetail from "./features/products/ProductDetail.jsx";
import CartPage from "./features/cart/CartPage.jsx";
import OrderPage from "./features/order/OrderPage.jsx";
import RedirectMain from "./components/RedirectMain.jsx";
import AuthRoute from "./components/AuthRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [

        {
          index: true,
          element: <Home />
        },

        {
          element: <RedirectMain />,
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <Register />
            },

          ]
        },

        {
          element: <AuthRoute />,
          children: [
            {
              path: 'profile',
              element: <UserProfile />
            },
            {
              path: 'cart',
              element: <CartPage />
            },
            {
              path: 'orders',
              element: <OrderPage />
            }
          ]
        },

        {
          element: <AdminRoute />,
          children: [
            {
              path: 'admin',
              element: <AdminPage />
            },
            {
              path: 'admin/form/add',
              element: <Add />
            },
            {
              path: 'admin/form/edit/:id',
              element: <Edit />
            },

          ]
        },





        {
          path: 'product/:id',
          element: <ProductDetail />
        },




      ]
    }
  ]);
  return <RouterProvider router={router} />
}
