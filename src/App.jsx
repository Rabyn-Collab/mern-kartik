import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import RootLayout from "./components/RootLayout";
import MealList from "./pages/meals/MealList.jsx";

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
          path: 'meal-list/:category',
          element: <MealList />
        },
        {
          path: '*',
          element: <NotFound />
        },


      ]
    },



  ]);



  return <RouterProvider router={router} />
}
