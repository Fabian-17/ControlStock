import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddLocationPage from "../pages/AddLocationPage";
import AddEquipment from "../pages/AddEquipmentPage";
import AddOrganizationPage from "../pages/AddOrganizationPage";
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
            <Route path="/addOrganization" element={
                <PrivateRouteConfig element={<AddOrganizationPage />} />
            } />
        </Routes>
    );
};

export default PrivateRoutes;