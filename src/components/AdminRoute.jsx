import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function AdminRoute() {
  const { user } = useSelector((state) => state.userSlice);
  return user?.role === 'admin' ? <Outlet /> : <Navigate to={'/'} replace />
}