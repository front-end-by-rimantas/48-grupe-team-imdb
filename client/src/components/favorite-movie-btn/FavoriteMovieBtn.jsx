/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { MdFavorite } from "react-icons/md";
import style from "./FavoriteMovieBtn.module.css";

export function FavoriteMovieBtn({ href, path, onMsgStyle, offMsgStyle, removeMsgStyle }) {
    const {userId, favoriteData, updateFavoriteData, deleteFavoriteData} = useContext(GlobalContext);
    const [favoriteBtn, setFavoriteBtn] = useState(false);

    const favoriteMoviesHrefArr = [];
    let favoriteId = 'favoriteId';
    let isInArr = false;

    for (const data of favoriteData) {
        if (data.userId === userId) {
            favoriteMoviesHrefArr.push(data.href);
            if (data.href === href) {
                favoriteId = data.id;
                isInArr = true;
            }
        }
    } 

    const addedFavoriteMsg = (<p className={isInArr ? onMsgStyle : removeMsgStyle}>Added to favorite</p>);
    const removedFavoritesMsg = (<p className={!isInArr ? offMsgStyle : removeMsgStyle}>Removed</p>);
    const activeFavoriteBtn = (<span className={style.favoriteIconActive}><MdFavorite/></span>);
    const inactiveFavoriteBtn = (<span className={style.favoriteIconInactive}><MdFavorite/></span>);
    
    function handleFavorite (favoriteBtn) {
        setFavoriteBtn(!favoriteBtn)

        if(isInArr === false) {
            fetch('http://localhost:4840/user/favorite', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        href,
                        userId,
                        imgPath: path,
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        updateFavoriteData(data.favoriteArr)  
                    })
                    .catch(e => console.error(e));
        } else {
            fetch('http://localhost:4840/user/favorite/' + favoriteId, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'favorite deleted') {
                        deleteFavoriteData(favoriteId);
                    }
                })
                .catch(console.error); 
            }
        }

    return (
        <div className={style.favoriteBox}>
            <button className={style.favoriteBtn}  onClick={() => handleFavorite(favoriteBtn)} >
                {favoriteMoviesHrefArr.includes(href) ? activeFavoriteBtn : inactiveFavoriteBtn}
            </button>
            {isInArr ? addedFavoriteMsg : removedFavoritesMsg}
        </div>
    );
}