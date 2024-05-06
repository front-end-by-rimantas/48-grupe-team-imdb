import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './CardsSection.module.css';
import axios from 'axios';

export function CardsSection() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const movieListRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:4840/movies/get')
            .then(response => {
                setMovies(response.data.movies);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
                setError('Error fetching movie data. Please try again later.');
                setLoading(false);
            });
    }, []);

const handlePrevClick = () => {
    let scrollDistance;
    if (window.innerWidth >= 1280) {
        scrollDistance = 900;
    } else if (window.innerWidth >= 600) {
        scrollDistance = 500; 
    } else {
        scrollDistance = 100;
    }
    movieListRef.current.scrollLeft -= scrollDistance;
};

const handleNextClick = () => {
    let scrollDistance;
    if (window.innerWidth >= 1280) {
        scrollDistance = 900; 
    } else if (window.innerWidth >= 600) {
        scrollDistance = 500; 
    } else {
        scrollDistance = 100;
    }
    movieListRef.current.scrollLeft += scrollDistance;
};

    const handleWatchTrailerClick = (url) => {
        const trailerUrl = url + '?autoplay=1'; 
        window.open(trailerUrl, '_blank'); 
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className={style.cardsSection}>
            <button className={style.prevButton} onClick={handlePrevClick}>&lt;</button>
            <div className={style.movieContainer} ref={movieListRef}>
                <ul className={style.movieList}>
                    {movies.map((movie, index) => (
                        <li key={index} className={style.movieCard}>
                            <Link to={`/movies/get/${movie.href}`}>
                                <img src={`http://localhost:4840/assets/images/${movie.path}`} alt={movie.name} className={style.movieImage} />
                            </Link>
                            <div className={style.movieInfo}>
                                <div className={style.movieRating}><span>&#9733;</span>{movie.rating}</div>
                                <div className={style.movieName}>{movie.name}</div>
                                <button className={style.trailerButton} onClick={() => handleWatchTrailerClick(movie.url)}>Trailer</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button className={style.nextButton} onClick={handleNextClick}>&gt;</button>
        </section>
    );
}
