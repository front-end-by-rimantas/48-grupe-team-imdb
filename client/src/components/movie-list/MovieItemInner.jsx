/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
// import style from './MovieItems.module.css';
// import movies from './data'
// import { useParams } from 'react-router-dom';
// import { GoStarFill } from "react-icons/go";
// import { CiStar } from "react-icons/ci";

// export function MovieItemInner({ }) {
//         const { id } = useParams();
//         for(const key of movies){
//             if(key.href === id){

//         return (
//        <div className={`${style.boss} ${style.containerInner}`}>
//             <div className={style.heroSection}>
//                 <div>
//                     <h1>{key.name}</h1>
//                     <ul className = {style.underName}>
//                         <li>{key.year}</li>
//                         <li>{key.rating}</li>
//                     </ul>
//                 </div>
//                 <div className={style.rating}>
//                     <div>
//                         <p>IMDb RATING</p>
//                         <div className={style.yellow}>
//                             <i className={style.yellowStar}><GoStarFill size="1.5rem" /> </i>
//                             <p>{key.rating}/10</p>
//                         </div>
//                     </div>
//                     <div>
//                         <p>YOUR RATING</p>
//                         <div className={style.blue}>
//                             <i className={style.blueStar}><CiStar  size="1.5rem" /> </i>
//                             <p className={style.blueRate}>Rate</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className={style.containerItem}>
//                 <img className={style.imgItem} src={key.path} alt="" />
//                 <iframe className={style.url} src={key.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>  
//             </div>
//             <div className={style.btnCategory} >
//                 {key.category.split(',').map((category, index) => (
//                     <button className={style.btn} key={index}>{category.trim()}</button>
//                 ))}
//             </div>
//             <div>
//                 <p>{key.description.split('\n').map((line, index) => (
//                     <div key={index}>{line}</div>))}</p>
//             </div>    
//         </div>
//             );
//         }
//     }
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import style from './MovieItems.module.css';

export function MovieItemInner() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4840/movies/get/${id}`)
            .then(response => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
                setError('Error fetching movie data. Please try again later.');
                setLoading(false);
            });
    }, [id]);

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
                    <h1>{movie.Name}</h1>
                    <ul className={style.underName}>
                        <li>{movie.Year}</li>
                        <li>{movie.Rating}</li>
                    </ul>
                </div>
                <div className={style.rating}>
                    <div>
                        <p>IMDb RATING</p>
                        <div className={style.yellow}>
                            <i className={style.yellowStar}><GoStarFill size="1.5rem" /> </i>
                            <p>{movie.Rating}/10</p>
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
                <img className={style.imgItem} src={movie.Path} alt="" />
                <iframe className={style.url} src={movie.Url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className={style.btnCategory} >
                {movie.Category.split(',').map((category, index) => (
                    <button className={style.btn} key={index}>{category.trim()}</button>
                ))}
            </div>
            <div>
                <p>{movie.description.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}</p>
            </div>
        </div>
    );
}