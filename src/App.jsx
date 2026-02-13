import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./features/home/Home";
import NotFound from "./features/not-found/NotFound";
import RootLayout from "./components/RootLayout";
import Popular from "./features/movies/Popular.jsx";
import Upcoming from "./features/movies/Upcoming.jsx";
import TopRated from "./features/movies/TopRated.jsx";
import MovieDetail from "./features/movies/MovieDetail.jsx";

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
          path: 'popular',
          element: <Popular />
        },
        {
          path: '/upcoming',
          element: <Upcoming />
        },
        {
          path: '/top-rated',
          element: <TopRated />
        },
        {
          path: '/movie/:id',
          element: <MovieDetail />
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
