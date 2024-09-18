import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddLocationPage from "../pages/AddLocationPage";
import AddEquipment from "../pages/AddEquipmentPage";
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
            <Route path="/addEquipment" element={
                <PrivateRouteConfig element={<AddEquipment />} />
            } />
        </Routes>
    );
};

export default PrivateRoutes;