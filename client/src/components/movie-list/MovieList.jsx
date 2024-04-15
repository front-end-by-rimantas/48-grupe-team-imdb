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
        <div className={style.boss}>
            <div className={style.main}>
                <div>
                    <h3>IMDb Charts</h3>
                    <h1>Most Popular movies</h1>
                </div>
                <div className={style.container}>
                    <div className={style.item}>
                        {movies.map((movie, index) => <MovieItem key={index} data={movie} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}





