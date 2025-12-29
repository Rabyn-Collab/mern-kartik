import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/not-found/NotFound";
import Page1 from "./pages/home/nested-pages/Page1";
import Page2 from "./pages/home/nested-pages/Page2";

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: 'page1',
          element: <Page1 />
        },
        {
          path: 'page2',
          element: <Page2 />
        }
      ]
    },
    {
      path: 'about',
      element: <About />
    },
    {
      path: '*',
      element: <NotFound />
    }


  ]);



  return <RouterProvider router={router} />
}
