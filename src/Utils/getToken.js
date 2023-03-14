import _ from "lodash";

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

export default getToken;