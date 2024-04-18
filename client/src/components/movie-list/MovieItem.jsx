/* eslint-disable react/prop-types */

import style from './MovieItems.module.css';
import { Link } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";

export function MovieItem({ data }) {
    const { path, name, year, href } = data || {};
    return (
        <div className={style.container}>
            <div className={style.row}>
                <div className={style.item}>
                    <div className={style.img}>
                        <img src={`http://localhost:4840/assets/images/${path}`} alt=""  /> 
                    </div>
                </div>
                <div className={style.containerItem}>
                    <div className={style.favoriteIconList}>
                            <MdFavorite size="1.5rem">
                            <button name="favorite"></button>
                            </MdFavorite>
                    </div>
                    <div >
                        <Link className={style.title} to={`/movies/get/${href}`}>{name}</Link>
                    </div>
                    <div className={style.yearItem}>{year}</div>
                </div>
            </div>
        </div>
    );
}


