import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddLocationPage from "../pages/AddLocationPage";
import AddEquipment from "../pages/AddEquipmentPage";
import AddOrganizationPage from "../pages/AddOrganizationPage";
import NotFoundPage from "../pages/NotFoundPage";
import SingleEquipmentPage from "../pages/SingleEquipmentPage";
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
            <Route path="/equipment/:id" element={
                <PrivateRouteConfig element={<SingleEquipmentPage />} />
            } />
            <Route path="*" element={
                <PrivateRouteConfig element={<NotFoundPage />} />
            } />
        </Routes>
    );
};

export default PrivateRoutes;