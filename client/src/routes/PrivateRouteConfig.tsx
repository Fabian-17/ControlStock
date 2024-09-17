import { useAuth } from "../hooks/AuthHook";
import { Navigate } from "react-router-dom";

export const PrivateRouteConfig = ( { element }: { element: JSX.Element } ) => {
    const { user } = useAuth();
    return user?.isLogged ? element : <Navigate to="/login" />;
};