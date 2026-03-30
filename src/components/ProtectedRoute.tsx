import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth";

type Props = {
  children: ReactNode;
  rol?: string;
};

function ProtectedRoute({ children, rol }: Props) {

  const auth = useAuth(); // 👈 CAMBIO CLAVE

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (rol && auth.user.rol !== rol) {
    return <Navigate to="/inicio" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;