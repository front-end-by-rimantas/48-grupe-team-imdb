/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    userId: -1,
    updateUserId: () => { },
    favorite: [],
    updateFavoriteData: () => { },
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [userId, setUserId] = useState(initialContext.userId);
    const [favorite, setFavorite] = useState(initialContext.favorite);

    function updateLoginStatus(newStatusValue) {
        setLoginStatus(newStatusValue);
    }

    function updateUserId(id) {
        setUserId(id);
    }

    function updateFavoriteData(newValue) {
        setFavorite(newValue);
        
    }

    function deleteFavoriteData(favoriteId) {
        setFavorite(prev => prev.filter(favorit => favorit.id !== favoriteId));
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        userId,
        updateUserId,
        favorite,
        updateFavoriteData,
        deleteFavoriteData,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}