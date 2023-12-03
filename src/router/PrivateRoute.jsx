import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/authContext";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/signin" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;