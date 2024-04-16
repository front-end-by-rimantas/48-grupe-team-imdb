/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
};

export const GlobalContext = createContext(initialContext)

export function ContextWrapper(props) {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);

    function updateLoginStatus(newStatusValue) {
        setLoginStatus(newStatusValue);
    }

    const value = {
        loginStatus,
        updateLoginStatus,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}