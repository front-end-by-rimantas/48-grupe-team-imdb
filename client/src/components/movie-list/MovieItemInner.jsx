/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import style from './MovieItems.module.css';
import { MdFavorite } from "react-icons/md";
import MediaQuery from 'react-responsive';
import { MovieItemMobile } from './responsive-design/MovieItemMobile';
import { MovieItemTable } from './responsive-design/MovieItemTable';
import { MovieItemDesctop } from './responsive-design/MovieItemDesctop';


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
        <>
          <main style={{
        background: 'linear-gradient(90deg, rgb(var(--ipt-baseAlt-shade1-rgb, 31,31,31)), 20%, rgba(var(--ipt-baseAlt-shade1-rgb, 31,31,31), 0.6), 80%, rgb(var(--ipt-baseAlt-shade1-rgb, 31,31,31)))'
    }}>  
                        <MediaQuery maxWidth={640}> 
                            {(matches) =>
                            matches ? (
                                <MovieItemMobile movie={movie} />
                                ):(
                        <MediaQuery minWidth={641} maxWidth={1280}>
                            {(matches) =>
                            matches ? (
                                <MovieItemTable movie={movie} />
                            ):(
                        <MediaQuery minWidth={1281} maxWidth={1920}>
                            {(matches) =>
                            matches ? (
                                <MovieItemDesctop movie={movie} />
                                ):(
                                <div className={`${style.boss} ${style.containerInner}`}>
                                    <div className={style.heroSection}>
                                        <div className={style.nameAndRating}>
                                            <h1>{movie?.name}</h1>
                                            <div className = {style.underName}>
                                                <p>{movie?.year}</p>
                                                        <svg width="20" height="20">
                                                            <circle cx="10" cy="10" r="3" fill= "white" />
                                                        </svg>
                                                <p>{movie?.ageCenzor}</p>
                                                        <svg width="20" height="20">
                                                            <circle cx="10" cy="10" r="3" fill= "white" />
                                                        </svg>
                                                <div className={style.favoriteIcon}>
                                                    <MdFavorite size="1.5rem"/>
                                                </div>
                                            </div>
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
                                    <div className={style.containerItemInner}>
                                            <img className={style.imgItem} src={`http://localhost:4840/assets/images/${movie?.path}`} alt="" />
                                            <iframe className={style.url} src={movie?.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                                    </div>
                                    <div className={style.descriptionMovie}>
                                        {movie?.description?.split('\n').map((line, index) => (
                                            <div key={index}>{line}</div>
                                        ))}
                                    </div>
                                </div>
                           )}
                         </MediaQuery>
                        )}
                </MediaQuery>
                )}
            </MediaQuery>
        </main>
    </>);
}