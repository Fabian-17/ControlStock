import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { Route, Routes as RouterRoutes, BrowserRouter } from "react-router-dom";


const Routes = () => {
    return (
        <BrowserRouter>
            <RouterRoutes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route path="/home/*" element={<PrivateRoutes />} />
            </RouterRoutes>
        </BrowserRouter>
    );
};

export default Routes;