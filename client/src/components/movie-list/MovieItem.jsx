/* eslint-disable react/prop-types */

import style from './MovieItems.module.css';
import { Link } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export function MovieItem({ data, updateMovies }) {

  
    const { id, path, name, year, href, rating, gross } = data || {};
    const {userId, favoriteData, loginStatus, updateFavoriteData, deleteFavoriteData} = useContext(GlobalContext);
    const [favoriteBtn, setFavoriteBtn] = useState(false);

    const favoriteMoviesHrefArr = [];
    let favoriteId = 'favoriteId';
    let isInArr = false;

    for (const data of favoriteData) {
        if (data.userId === userId) {
            favoriteMoviesHrefArr.push(data.href);
            if (data.href === href) {
                favoriteId = data.id;
                isInArr = data.isInArr;
            }
        }
    } 

    const activeFavoriteBtn = (<span className={style.favoriteIconActive}><MdFavorite/></span>);
    const inactiveFavoriteBtn = (<span className={style.favoriteIconInactive}><MdFavorite/></span>);
    const favoriteHtmlBtn = (
        <button className={style.favoriteBtn}  onClick={() => handleFavorite(favoriteBtn)} >
            {favoriteMoviesHrefArr.includes(href) ? activeFavoriteBtn : inactiveFavoriteBtn}
        </button>
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
                    src={`http://localhost:4840/assets/images/${path}`}
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
                {rating ? (
                  <div className={style.starRating}>
                    <span className={style.star}>★</span>
                    {rating}
                  </div>
                ) : null}
                {gross ? (
                  <div className={style.starRating}>
                    <span className={style.star}>$</span>
                    {gross}
                  </div>
                ) : null}
                <div className={style.buttons}>
                  {loginStatus ? (
                    <>
                      {userId === data.userId && (
                        <div className={style.crud}>
                          <button className={style.button}>
                            <Link
                              className={style.link}
                              to={`/movies/get/${href}`}
                            >
                              View
                            </Link>
                          </button>
                          <button className={style.button}>
                            <Link
                              className={style.link}
                              to={`/account/movie-edit/${data.href}`}
                            >
                              Edit
                            </Link>
                          </button>
                          <button
                            className={style.button}
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


