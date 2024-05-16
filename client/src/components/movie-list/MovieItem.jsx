/* eslint-disable react/prop-types */

import style from './MovieItems.module.css';
import { Link } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import movieDefaultImg from '../../../../server/assets/imdb.png';

export function MovieItem({ data, updateMovies }) {

  
    const { id, path, name, year, href, rating, gross } = data || {};
    const {userId, favoriteData, loginStatus, updateFavoriteData, deleteFavoriteData} = useContext(GlobalContext);
    const [favoriteBtn, setFavoriteBtn] = useState(false);
    const imagePath = path ? `http://localhost:4840/assets/images/${path}` : movieDefaultImg;

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

    const addedFavoriteMsg = (<p className={isInArr ? style.favoriteMessageDark : style.off}>Added to favorite</p>);
    const removedFavoritesMsg = (<p className={!isInArr ? style.favoriteMessageRemoveDark : style.off}>Removed</p>);
    const activeFavoriteBtn = (<span className={style.favoriteIconActive}><MdFavorite/></span>);
    const inactiveFavoriteBtn = (<span className={style.favoriteIconInactive}><MdFavorite/></span>);
    const favoriteHtmlBtn = (
      <div className={style.favoriteBox}>
        <button className={style.favoriteBtn}  onClick={() => handleFavorite(favoriteBtn)} >
            {favoriteMoviesHrefArr.includes(href) ? activeFavoriteBtn : inactiveFavoriteBtn}
        </button>
        {isInArr ? addedFavoriteMsg : removedFavoritesMsg}
      </div>
    );

    function handleDeleteTask(id) {
      fetch(`http://localhost:4840/movies/delete/` + id, {
          method: 'DELETE',
      })
      .then(response => {
          if (response.ok) {
              console.log(`Movie with ID ${id} deleted successfully`);
              updateMovies(id);
          } else {
              throw new Error('Failed to delete movie');
          }
      })
      .catch(error => {
          console.error('Error deleting movie:', error);
      });
  }

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
          <div className={style.container}>
            <div className={style.row}>
              <div className={style.item}>
                <div className={style.img}>
                  <img
                    src={imagePath}
                    alt=""
                  />
                </div>
              </div>
              <div className={style.containerItem}>
                <div className={style.favoriteIconList}>
                  {loginStatus ? favoriteHtmlBtn : null}
                </div>
                <div>
                  <Link className={style.title} to={`/movies/get/${href}`}>
                    {name}
                  </Link>
                </div>
                <div className={style.yearItem}>{year}</div>
                {console.log("Rating value:", rating)}
                {rating ? (
                  <div className={style.starRating}>
                    <span className={style.star}>★</span>
                    {Number.isInteger(parseFloat(rating)) ? parseFloat(rating).toFixed(0) : parseFloat(rating).toFixed(1)}
                  </div>
                ) : null}
                {gross ? (
                  <div className={style.dolarRating}>
                    <span className={style.dolar}>$</span>
                    {gross}
                  </div>
                ) : null}
                <div className={style.buttons}>
                  {loginStatus ? (
                    <>
                      {userId === data.userId && (
                        <div className={style.crud}>
                          <button className={style.viewButton}>
                            <Link
                              className={style.link}
                              to={`/movies/get/${href}`}
                            >
                              View
                            </Link>
                          </button>
                          <button className={style.editButton}>
                            <Link
                              className={style.link}
                              to={`/account/movie-edit/${data.href}`}
                            >
                              Edit
                            </Link>
                          </button>
                          <button
                            className={style.deleteButton}
                            onClick={() => handleDeleteTask(id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
}


