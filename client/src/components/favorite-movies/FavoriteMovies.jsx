/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */

import { useContext, useState } from 'react';
import style from './FavoriteMovies.module.css';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import movieDefaultImg from '../../../../server/assets/imdb.png';


export function FavoriteMovies() {
    const { favoriteData, userId, deleteFavoriteData } = useContext(GlobalContext);
    const [delet, setDelet] = useState(false);

    const favoriteMoviesHrefArr = [];

    for (const data of favoriteData) {
        if (data.userId === userId) {
            favoriteMoviesHrefArr.push(data);
        }
    } 

    function handleDelete (favoriteId) {
        setDelet(!delet);
        

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

    const emptyPage = (
        <div className={style.emptyMoviesBox}>
            <h2 className={style.favoritMoviesTitle}>
                There are currently no favorite movie cards added. 
                <Link className={style.linkToMoviesList} to={'/movies/get'}>Add the first card ?</Link>
            </h2>
        </div>
    );

    const notEmptyPage = (
        <div className={style.favoritMoviesBox}>
            {favoriteMoviesHrefArr.map((favorit, index) => (
            <div key = {index} className={style.favoriteMovieCard}>
                <Link to={`/movies/get/${favorit.href}`}>
                    <img className={style.cardImg} src={favorit.imgPath ? `http://localhost:4840/assets/images/${favorit.imgPath}` : movieDefaultImg} alt="" />
                </Link>
                <button onClick={() => handleDelete(favorit.id)} className={style.deleteBtn}>Remove from list</button>
            </div>
            ))}
        </div>
    );

    return (
        <div className={style.container}>
            <h1 className={style.favoritMoviesTitle}>My favorite movies</h1>
            {favoriteMoviesHrefArr.length > 0 ? notEmptyPage : emptyPage}
        </div>
    );
}
