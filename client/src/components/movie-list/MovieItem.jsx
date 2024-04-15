/* eslint-disable react/prop-types */

import style from './MovieItems.module.css';
import { Link } from 'react-router-dom';

export function MovieItem({ data }) {
    const { path, name, year, href } = data || {};
    return (
        <div className={style.container}>
            <div className={style.row}>
                <div className={style.item}>
                    <div className={style.img}>
                        <img src={`http://localhost:4840/assets/images/${path}`} alt="" width="72px" height="106px" />
                    </div>
                </div>
                <div className={style.description}>
                    <div className={style.title}>
                        <Link to={`/movies/get/${href}`}>{name}</Link>
                    </div>
                    <div className={style.year}>{year}</div>
                </div>
            </div>
        </div>
    );
}


