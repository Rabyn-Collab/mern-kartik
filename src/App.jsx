import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./features/home/Home.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";

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
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        }



      ]
    }
  ]);
  return <RouterProvider router={router} />
}
