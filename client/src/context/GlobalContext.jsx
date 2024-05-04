/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    userId: -1,
    updateUserId: () => { },
    favoriteData: [],
    updateFavoriteData: () => { },
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [userId, setUserId] = useState(initialContext.userId);
    const [favoriteData, setFavoriteData] = useState(initialContext.favoriteData);

    useEffect(() => {
        fetch('http://localhost:4840/user/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data !== 'undefined') {
                    updateLoginStatus(data.loggedIn);
                    updateUserId(data.id);
                }
            })
            .catch(console.error);
    }, []);


    useEffect(() => {
        if (loginStatus === true) {
        fetch('http://localhost:4840/user/allFavoriteMovies')
            .then(res => res.json())
            .then(data => updateFavoriteData(data.favoriteArr))
            .catch(console.error);
        }
    }, [loginStatus]);


    function updateLoginStatus(newStatusValue) {
        setLoginStatus(newStatusValue);
    }

    function updateUserId(id) {
        setUserId(id);
    }

    function updateFavoriteData(newValue) {
        setFavoriteData(newValue);
        
    }

    function deleteFavoriteData(favoriteId) {
        setFavoriteData(prev => prev.filter(favorit => favorit.id !== favoriteId));
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        userId,
        updateUserId,
        favoriteData,
        updateFavoriteData,
        deleteFavoriteData,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}