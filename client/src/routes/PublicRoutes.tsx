import { Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import { PublicRouteConfig } from "./PublicRouteConfig";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";


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
            <Route path="*" element={
                <PublicRouteConfig element={<NotFoundPage />} />
            } />
        </Routes>
    );
};


export default PublicRoutes;