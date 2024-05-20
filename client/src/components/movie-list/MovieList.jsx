/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { MovieItem } from './MovieItem.jsx';
import style from './MovieItems.module.css';
import axios from 'axios';

export function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const updateMovies = (deletedMovieId) => {
        setMovies(prevMovies => prevMovies.filter(movie => movie.id !== deletedMovieId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!Array.isArray(movies)) {
        return <div>No movies found.</div>;
    }

    return (
        <div className={style.listContainer}>
                <div className={style.titleList}>
                    <h3 className={style.movieTitle}>IMDb Charts</h3>
                    <h1>List movies</h1>
                </div>
                <div className={style.containerList}>
                    <div className={style.itemList}>
                        {movies.map((movie, index) => <MovieItem key={index} data={movie} updateMovies={updateMovies} />)}

                    </div>
                </div>
        </div>
    );
}





