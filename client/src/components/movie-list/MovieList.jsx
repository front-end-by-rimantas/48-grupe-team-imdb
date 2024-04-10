import { MovieItem } from './MovieItem.jsx';
import style from './MovieItems.module.css';
import movies from './data.js';

export function MovieList() {
    return (
    <div className={style.boss}>
        <div className={style.main}>
            <div>
                <h3>IMDb Charts</h3>
                <h1>Most Popular movies</h1>
            </div>
            <div className={style.container}>
                <div className={style.item}>
                    {movies.map((movi, index) => <MovieItem key={index} data={movi} />)}
                </div>
            </div>
        </div>
    </div>
    );

}
