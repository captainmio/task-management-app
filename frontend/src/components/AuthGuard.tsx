import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export const AuthGuard = () => {
  const token = useAuthStore((state) => state.token);

  return token ? <Outlet /> : <Navigate to="/" replace />;
};
