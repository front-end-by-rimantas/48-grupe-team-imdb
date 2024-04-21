/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import style from './FavoriteMovies.module.css'
import { GlobalContext } from '../../context/GlobalContext'
import { Link } from 'react-router-dom'

export function FavoriteMovies() {
    const { favorite, updateFavoriteStatus } = useContext(GlobalContext)

    console.log(favorite)
    return (
        <div className={style.container}>
            {favorite.map((favorit, index) => ( < Link to={`/movies/get/${favorit}`}>
                <img className={style.imgItem} src={`http://localhost:4840/assets/images/${favorit}.jpg`} alt="" />
                </Link>))}
        </div>
    )
}