import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({children}){
    const location = useLocation();
    const {isAuthenticated , loading } = useAuth();

    if(loading){
       return  <h2>Loading......</h2>
    }

    if(!isAuthenticated){
        return (
            <Navigate
                to="/login"
                state={{
                    from:location.pathname,
                }}
                replace
           />   
        );
    };
    return children;
}