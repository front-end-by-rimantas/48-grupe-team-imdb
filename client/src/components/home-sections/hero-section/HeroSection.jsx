import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './HeroSection.module.css';
import axios from 'axios';

export function HeroSection() {
    const [movies, setMovies] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    useEffect(() => {
        // Fetch the list of movies from the backend
        axios.get('http://localhost:4840/movies/get')
            .then(response => {
                setMovies(response.data.movies);
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
    }, []);

    const handleNextButtonClick = () => {
        // Increment the current movie index
        setCurrentMovieIndex(prevIndex => (prevIndex + 1) % movies.length);
    };

    const handlePrevButtonClick = () => {
        // Decrement the current movie index
        setCurrentMovieIndex(prevIndex => (prevIndex - 1 + movies.length) % movies.length);
    };

    // Ensure movies array is not empty and currentMovieIndex is valid
    const currentMovie = movies.length > 0 ? movies[currentMovieIndex] : null;

    return (
        <section className={style.heroSection}>
            {currentMovie && (
                <div className={style.movieInfo}>
                    <Link to={`/movies/get/${currentMovie.href}`} className={style.nameUrl}>
                        <div className={style.movieName}>{currentMovie.name}</div>
                    </Link>
                    <div className={style.poster}>
                        <Link to={`/movies/get/${currentMovie.href}`} className={style.nameUrl}>
                            <img src={`http://localhost:4840/assets/images/${currentMovie.path}`} alt="" />
                        </Link>
                    </div>
                </div>
            )}
            <div className={style.arrowButtons}>
                <button className={style.prevButton} onClick={handlePrevButtonClick}>{'<'}</button>
                <button className={style.nextButton} onClick={handleNextButtonClick}>{'>'}</button>
            </div>
        </section>
    );
}
