import { Navigate, useLocation } from "react-router-dom";

import jwt from "jwt-decode";
import { logout } from "../../API/api";

const authorisedPath = {
    "tenant": ["/datafiles", "/datafiles/upload", "/campaigns", "/campaigns/addcampaigns" ], 
    "customer": ["/rewards" ]
}

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");
    const { pathname } = useLocation();

    if (token) {
        const decodedToken = jwt(token);
        const expirationDate = decodedToken["exp"];
        console.log(expirationDate)
        if (expirationDate < Math.floor(Date.now() / 1000)) {
            localStorage.removeItem("token"); 
            return <Navigate to="/" />
        }

        const role = jwt(token)['cognito:groups'][0];
        if (!(authorisedPath[role].includes(pathname))) {
            return <Navigate to="/401" />
        }
    } 

    if (token === null) {
        return <Navigate to="/401" />
    } 

    return children;   
}

export default ProtectedRoute;