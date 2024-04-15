/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './HeroSection.module.css';
import axios from 'axios';

export function HeroSection() {
    const [movies, setMovies] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:4840/movies/get')
            .then(response => {
                setMovies(response.data.movies);
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
    }, []);

    const getRandomIndex = () => {
        return Math.floor(Math.random() * movies.length);
    };

    const handleNextButtonClick = () => {
        const randomIndex = getRandomIndex();
        setCurrentMovieIndex(randomIndex);
    };

    const handlePrevButtonClick = () => {
        const randomIndex = getRandomIndex();
        setCurrentMovieIndex(randomIndex);
    };

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
