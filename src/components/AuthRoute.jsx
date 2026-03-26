import { useSelector } from "react-redux";
import { Outlet } from "react-router";

export default function AuthRoute() {
  const { user } = useSelector((state) => state.userSlice);
  return user ? <Outlet /> : <Navigate to={'/login'} replace />
}