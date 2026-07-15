import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ rolesPermitidos }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
