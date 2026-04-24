import { Navigate, Outlet } from "react-router-dom";
import React from 'react';
import { useAuthStore } from "../store/auth.store";

export const AuthGuard: React.FC = () => {
  const token = useAuthStore((state) => state.token);

  return token ? <Outlet /> : <Navigate to="/" replace />;
};
