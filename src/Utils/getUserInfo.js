import _ from "lodash";
import jwt from "jwt-decode";

const getToken = () => {

    const cookiesList = document.cookie.split("; ");
    const cookieDict = {}

    _.forEach(cookiesList, (aCookie) => {
        if (aCookie.includes("access")) {
            cookieDict["accessToken"] = aCookie.slice("access=".length);
        } else if (aCookie.includes("id")) {
            cookieDict["idToken"] = aCookie.slice("id=".length);
        }
    })

    return cookieDict;
}

const getUserId = () => {
    const token = getToken();
    return jwt(token.idToken)["custom:id"];
}

export { getToken, getUserId } ;