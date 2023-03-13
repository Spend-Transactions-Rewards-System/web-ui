import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children}) => {

    const [userId, setUserId] = useState();

    return(
        <AppContext.Provider
            value={{
                userId, 
                setUserId
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext);
}


export { useAppContext, AppProvider };