import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import RootLayout from "./components/RootLayout";
import TodoAddFrom from "./pages/todos/TodoAddFrom.jsx";
import TodoUpdateForm from "./pages/todos/TodoUpdateForm.jsx";

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
          path: 'add-todo',
          element: <TodoAddFrom />
        },
        {
          path: 'update-todo/:id',
          element: <TodoUpdateForm />
        },

        {
          path: '*',
          element: <NotFound />
        }



      ]
    },



  ]);



  return <RouterProvider router={router} />
}
