import _ from "lodash";

const getToken = () => {

    const cookiesList = document.cookie.split("; ");
    const cookieDict = {}

    _.forEach(cookiesList, (aCookie) => {
        if (aCookie.includes("accessToken")) {
            cookieDict["accessToken"] = aCookie.slice("accessToken=".length);
        } else if (aCookie.includes("idToken")) {
            cookieDict["idToken"] = aCookie.slice("idToken=".length);
        }
    })

    return Object.keys(cookieDict).length === 0 ? null : cookieDict;

}

export default getToken;