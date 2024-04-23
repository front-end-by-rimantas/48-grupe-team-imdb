/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    userId: -1,
    updateUserId: () => { },
    favorite: [],
    updateFavoriteData: () => { },
    favoriteStatus: false,
    updateFavoriteStatus: () => { },
};

export const GlobalContext = createContext(initialContext)

export function ContextWrapper(props) {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [userId, setUserId] = useState(initialContext.userId);
    const [favorite, setFavorite] = useState(initialContext.favorite);
    const [favoriteStatus, setFavoriteStatus] = useState(initialContext.favoriteStatus)


    useEffect(() => {
        if (loginStatus === true) {
            fetch('http://localhost:4840/api/favorite/' + userId)
                .then(res => res.json())
                .then(dataObj => setFavorite(dataObj.list))
                .catch(console.error);
        }
    }, []);

    function updateLoginStatus(newStatusValue) {
        setLoginStatus(newStatusValue);
    }

    function updateUserId(id) {
        setUserId(id);
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
        userId,
        updateUserId,
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