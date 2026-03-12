import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./features/home/Home.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import UserProfile from "./features/user/UserProfile.jsx";
import AdminPage from "./features/admin/AdminPage.jsx";
import Add from "./features/admin/form/Add.jsx";
import Edit from "./features/admin/form/Edit.jsx";

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
        },
        {
          path: 'profile',
          element: <UserProfile />
        },

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
        }



      ]
    }
  ]);
  return <RouterProvider router={router} />
}
