import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import useType from "../hooks/useType";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [type, isTypeLoading] = useType();
  const location = useLocation();

  console.log(type)

  if (loading || isTypeLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && type === 'user') {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default UserRoute;
