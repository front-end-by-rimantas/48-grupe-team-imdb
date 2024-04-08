import { useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './CardsSection.module.css'
import avatar from '../../../assets/images/avatar.jpg'
import titanic from '../../../assets/images/titanic.jpg'
import crash from '../../../assets/images/crash.jpg'
import pulpfiction from '../../../assets/images/pulpfiction.jpg'
import se7en from '../../../assets/images/se7en.jpg'
import thetrumanshow from '../../../assets/images/thetrumanshow.jpg'
export function CardsSection() {
    const movieListRef = useRef(null);

    const handlePrevClick = () => {
        movieListRef.current.scrollLeft -= 250;
    };

    const handleNextClick = () => {
        movieListRef.current.scrollLeft += 250;
    };

    return (
        <section className={style.cardsSection}>
            <button className={style.prevButton} onClick={handlePrevClick}>&lt;</button>
            <div className={style.movieContainer} ref={movieListRef}>
                <ul className={style.movieList}>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={avatar} alt="Avatar" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>Avatar</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={titanic} alt="Movie Title" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>titanic</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={crash} alt="Movie Title" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>crash</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={pulpfiction} alt="Movie Title" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>pulpfiction</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={se7en} alt="Movie Title" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>se7en</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={thetrumanshow} alt="Movie Title" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>thetrumanshow</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={thetrumanshow} alt="Movie Title" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>thetrumanshow</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={thetrumanshow} alt="Movie Title" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>thetrumanshow</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    <li className={style.movieCard}>
                        <Link to="/:id">
                        <img src={thetrumanshow} alt="Movie Title" className={style.movieImage} />
                        </Link>
                        <div className={style.movieInfo}>
                            <div className={style.movieRating}><span>&#9733;</span>8.5</div>
                            <div className={style.movieName}>thetrumanshow</div>
                            <button className={style.trailerButton}>Watch Trailer</button>
                        </div>
                    </li>
                    </ul>
            </div>
            <button className={style.nextButton} onClick={handleNextClick}>&gt;</button>
        </section>
    );
}