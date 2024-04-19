/* eslint-disable react/prop-types */
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import style from '../MovieItems.module.css';

export function MovieItemDesctop({ movie }) {
    return (<div className={`${style.boss} ${style.containerInner}`}>
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
);}