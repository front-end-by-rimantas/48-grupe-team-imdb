/* eslint-disable react/prop-types */
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import style from '../MovieItems.module.css';

export function MovieItemTable({  movie }) {
    return (
    <>
        <div className={`${style.bossTable} ${style.heroSectionTable}`}> 
            <div className={style.nameAndRating}>
                <h1>{movie?.name}</h1>
                <div className={style.underNameTable}>
                    <p>{movie?.year}</p>
                    <svg width="20" height="20">
                        <circle cx="10" cy="10" r="3" fill="white" />
                    </svg>
                    <p>{movie?.ageCenzor}</p>
                    <svg width="20" height="20">
                        <circle cx="10" cy="10" r="3" fill="white" />
                    </svg>
                    <div className={style.favoriteIcon}>
                        <MdFavorite size="1.5rem"/>
                    </div>
                </div>
            </div>
        </div>
        <div className={style.containerTable}>
            <img className={style.imgItem} src={`http://localhost:4840/assets/images/${movie?.path}`} alt="" />
            <iframe className={style.urlTable} src={movie?.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className={style.descriptionMovieTable}>{movie?.description}</div>
        <div className={style.ratingTable}>
            <div>
                <p  className={style.yellowTable}>IMDB RATING</p>
                <div className={style.yellow}>
                    <i className={style.yellowStar}><GoStarFill size="1.5rem" /> </i>
                    <p>{movie?.rating}/10</p>
                </div>
            </div>
            <div>
                <p className={style.blueTable}>YOUR RATING</p>
                <div className={style.blue}>
                    <i className={style.blueStar}><CiStar size="1.5rem" /> </i>
                    <p className={style.blueRate}>Rate</p>
                </div>
            </div>
        </div>
    </> 
);}