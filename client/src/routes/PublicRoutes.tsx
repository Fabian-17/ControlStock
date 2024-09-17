import { Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import { PublicRouteConfig } from "./PublicRouteConfig";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";


const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PublicRouteConfig element={<WelcomePage />} />
            } />
            <Route path="/registro" element={
                <PublicRouteConfig element={<Register />} />
            } />
            <Route path="/login" element={
                <PublicRouteConfig element={<Login />} />
            } />
        </Routes>
    );
};


export default PublicRoutes;