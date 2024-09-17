import { useAuth } from "../hooks/AuthHook";
import { Navigate } from "react-router-dom";

export const PublicRouteConfig = ({ element }: { element: JSX.Element }) => {
    const { user } = useAuth();
    
    // Redirige a "/home" si el usuario está autenticado
    return user?.isLogged ? <Navigate to="/home" /> : element;
};