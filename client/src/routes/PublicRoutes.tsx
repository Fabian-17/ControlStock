import { Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import { PublicRouteConfig } from "./PublicRouteConfig";


const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PublicRouteConfig element={<WelcomePage />} />
            } />
        </Routes>
    );
};


export default PublicRoutes;