import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./features/home/Home";
import NotFound from "./features/not-found/NotFound";
import RootLayout from "./components/RootLayout";
import AddBlog from "./features/blogs/AddBlog.jsx";

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
          path: 'add-blog',
          element: <AddBlog />
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
