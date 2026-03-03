import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./features/home/Home.jsx";

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [

        {
          index: true,
          element: <Home />
        }



      ]
    }
  ]);
  return <RouterProvider router={router} />
}
