import { Navigate, useLocation } from "react-router-dom";

import jwt from "jwt-decode";

import getToken from "../../Utils/getToken";

const authorisedPath = {
    "tenant": ["/datafiles", "/datafiles/upload", "/campaigns", "/campaigns/addcampaigns" ], 
    "customer": ["/rewards" ]
}

const ProtectedRoute = ({ children }) => {

    const token = getToken().accessToken;
    const { pathname } = useLocation();
    let d = new Date(0);

    if (token) {
        const decodedToken = jwt(token);
        const expirationDate = decodedToken["exp"];
        if (expirationDate < Math.floor(Date.now() / 1000)) {
            d.setDate(d.setUTCSeconds(expirationDate).getDate() - 1) ; 
            document.cookie=`accessToken= ; expires= ${d}`;
            document.cookie=`idToken= ; expires= ${d}`;
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