/* eslint-disable react/prop-types */

import style from './MovieItems.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { FavoriteMovieBtn } from '../favorite-movie-btn/FavoriteMovieBtn';
import fBtnStyle from "../favorite-movie-btn/FavoriteMovieBtn.module.css"
import movieDefaultImg from '../../../../server/assets/imdb.png';

export function MovieItem({ data, updateMovies }) {

    const { id, path, name, year, href, rating, gross } = data || {};
    const { userId, loginStatus } = useContext(GlobalContext);
    const imagePath = path ? `http://localhost:4840/assets/images/${path}` : movieDefaultImg;

    function handleDeleteTask(id) {
      fetch(`http://localhost:4840/movies/delete/` + id, {
          method: 'DELETE',
      })
      .then(response => {
          if (response.ok) {
              // console.log(`Movie with ID ${id} deleted successfully`);
              updateMovies(id);
          } else {
              throw new Error('Failed to delete movie');
          }
      })
      .catch(error => {
          console.error('Error deleting movie:', error);
      });
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
                  {loginStatus ? 
                    <FavoriteMovieBtn 
                      href={href} path={path} 
                      onMsgStyle={fBtnStyle.favoriteMessageDark} 
                      offMsgStyle={fBtnStyle.favoriteMessageRemoveDark} 
                      removeMsgStyle={fBtnStyle.off}
                    /> 
                  : null}
                </div>
                <div>
                  <Link className={style.title} to={`/movies/get/${href}`}>
                    {name}
                  </Link>
                </div>
                <div className={style.yearItem}>{year}</div>
                {/* {console.log("Rating value:", rating)} */}
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


