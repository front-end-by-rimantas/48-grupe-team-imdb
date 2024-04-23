/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */

import { useContext, useState } from 'react'
import style from './FavoriteMovies.module.css'
import { GlobalContext } from '../../context/GlobalContext'
import { Link } from 'react-router-dom'


export function FavoriteMovies() {
    const { favorite, userId } = useContext(GlobalContext);
    const [delet, setDelet] = useState(false);

    const favoriteMoviesHrefArr = [];

    for (const data of favorite) {
        if (data.userId === userId) {
            favoriteMoviesHrefArr.push(data);
        }
    } 

    function handleDelete (favorit) {
        setDelet(!delet);
        console.log(favorit);
        
    }

    return (
        <div className={style.container}>
            <h1 className={style.favoritMoviesTitle}>List of my favorite movies</h1>
            <div className={style.favoritMoviesBox}>
                {favoriteMoviesHrefArr.map((favorit, index) => (
                    <div key = {index} className={style.favoriteMovieCard}>
                    < Link to={`/movies/get/${favorit.href}`}>
                        <img className={style.cardImg} src={`http://localhost:4840/assets/images/${favorit.href}.jpg`} alt="" />
                    </Link>
                    <button onClick={() => handleDelete(favorit.id)} className={style.deleteBtn}>DELETE</button>
                </div>
                ))}
            </div>
        </div>
    )
}