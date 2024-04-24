import style from './TopTen.module.css';
import { MovieTop10 } from '../movie-list/MovieTop10';

export function TopTen() {

    return (
        <main className={style.allElements}>
            <div className={style.topSide}>
                <h1 className={style.text}>IMDb Charts</h1>
                <p className={style.border}>IMDb Top 10 Movies</p>
                <p className={style.text}>As rated by regular IMDb voters.</p>
            </div>
            <div className={style.topSide}>
                <p className={style.text}>10 Titles</p>
            </div>
            <div className={style.movieCards}>
                <ul className={style.cardsContainer}>
                    <MovieTop10 className={style.mainCards} />
                </ul>
            </div>
        </main>
    );
}