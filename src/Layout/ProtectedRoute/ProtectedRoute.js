import { Navigate, useLocation } from "react-router-dom";

import jwt from "jwt-decode";
import moment from "moment";

import { getToken } from "../../Utils/getUserInfo";

const authorisedPath = {
    "tenant": ["/datafiles", "/datafiles/upload", "/campaigns", "/campaigns/addcampaigns" ], 
    "customer": ["/rewards" ]
}

const ProtectedRoute = ({ children }) => {

    const { pathname } = useLocation();

    try {
        const token = getToken().accessToken;
    
        if (token) {
            const decodedToken = jwt(token);
            const expirationDate = decodedToken["exp"];

            if (expirationDate < Math.floor(Date.now() / 1000)) {
                const newExpirationDate = moment.unix(expirationDate).subtract(1, "days"); 
                document.cookie=`access= ; expires= ${newExpirationDate}`;
                document.cookie=`id= ; expires= ${newExpirationDate}`;
                return <Navigate to="/" />
            }
    
            const role = jwt(token)['cognito:groups'][0];
            if (!(authorisedPath[role].includes(pathname))) {
                return <Navigate to="/401" />
            }
        } else {
            return <Navigate to="/401" />
        }

    } catch {
        return <Navigate to="/" />
    }   

    return children;   
}

export default ProtectedRoute;