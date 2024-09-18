import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddLocationPage from "../pages/AddLocationPage";
import { PrivateRouteConfig } from "./PrivateRouteConfig";


const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PrivateRouteConfig element={<HomePage />} />
            } />
            <Route path="/addLocation" element={
                <PrivateRouteConfig element={<AddLocationPage />} />
            } />
        </Routes>
    );
};

export default PrivateRoutes;