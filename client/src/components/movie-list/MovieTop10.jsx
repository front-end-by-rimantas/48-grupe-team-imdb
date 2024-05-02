/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { MovieItem } from './MovieItem.jsx';
import style from './MovieItems.module.css';
import axios from 'axios';
 
export function MovieTop10() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        axios.get('http://localhost:4840/movies/get')
            .then(response => {
                const formattedMovies = response.data.movies.map(movie => {
                    const rating = parseFloat(movie.rating);
                    return { ...movie, rating };
                });

                const sortedMovies = formattedMovies.sort((a, b) => b.rating - a.rating).slice(0, 10);
                setMovies(sortedMovies);
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
 
    if (!Array.isArray(movies) || movies.length === 0) {
        return <div>No movies found.</div>;
    }
 
    return (
            <div>
                <div className={style.main}>
                    <div>
                        <h3 className={style.h3TopTen}>Top 10 Movies Sorted by Rating</h3>
                    </div>
                    <div className={style.topTenContainer}>
                        <div className={style.item}>
                            {movies.map((movie, index) => <MovieItem key={index} data={movie} />)}
                        </div>
                    </div>
                </div>
            </div>
    );
}