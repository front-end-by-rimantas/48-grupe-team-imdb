/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import style from './MovieItems.module.css';

export function MovieItemInner() {
    const { href } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4840/movies/get/${href}`)
            .then(response => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
                setError('Error fetching movie data. Please try again later.');
                setLoading(false);
            });
    }, [href]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={`${style.boss} ${style.containerInner}`}>
            <div className={style.heroSection}>
                <div>
                    <h1>{movie?.name}</h1>
                    <ul className={style.underName}>
                        <li>{movie?.year}</li>
                        <li>{movie?.rating}</li>
                    </ul>
                </div>
                <div className={style.rating}>
                    <div>
                        <p>IMDb RATING</p>
                        <div className={style.yellow}>
                            <i className={style.yellowStar}><GoStarFill size="1.5rem" /> </i>
                            <p>{movie?.rating}/10</p>
                        </div>
                    </div>
                    <div>
                        <p>YOUR RATING</p>
                        <div className={style.blue}>
                            <i className={style.blueStar}><CiStar size="1.5rem" /> </i>
                            <p className={style.blueRate}>Rate</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.containerItem}>
                <img className={style.imgItem} src={`http://localhost:4840/assets/images/${movie?.path}`} alt="" />

                <iframe className={style.url} src={movie?.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div>
                {movie?.description?.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
        </div>
    );
}
