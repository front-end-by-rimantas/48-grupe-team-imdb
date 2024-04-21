/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    favorite: [],
    updateFavoriteData: () => { },
    favoriteStatus: false,
    updateFavoriteStatus: () => { },
};

export const GlobalContext = createContext(initialContext)

export function ContextWrapper(props) {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [favorite, setFavorite] = useState(initialContext.favorite);
    const [favoriteStatus, setFavoriteStatus] = useState(initialContext.favoriteStatus)

    function updateLoginStatus(newStatusValue) {
        setLoginStatus(newStatusValue);
    }

    function updateFavoriteData(newValue) {
        setFavorite(newValue)
        
    }

    function updateFavoriteStatus(newStatusValue) {
        setFavoriteStatus(newStatusValue)
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        favorite,
        updateFavoriteData,
        favoriteStatus,
        updateFavoriteStatus,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}