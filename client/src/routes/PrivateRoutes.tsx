import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { PrivateRouteConfig } from "./PrivateRouteConfig";


const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <PrivateRouteConfig element={<HomePage />} />
            } />
        </Routes>
    );
};

export default PrivateRoutes;