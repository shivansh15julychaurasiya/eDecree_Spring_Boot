import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { token, user } = useSelector((s) => s.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles?.length) {
    const userRoles = user?.roles || [];
    const allowed = roles.some((r) => userRoles.includes(r));
    if (!allowed) return <div>Unauthorized</div>;
  }

  return children;
};

export default ProtectedRoute;