/* eslint-disable react/prop-types */
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import style from '../MovieItems.module.css';

export function MovieItemMobile({  movie, loginStatus, favoriteHtmlBtn }) {
    return (
<div className={`${style.bossMobile} ${style.containerInnerMobile}`}>
    <div className={style.heroTitleMobile}>
        <h1>{movie?.name}</h1>
        <div className = {style.underNameMobile}>
            <p>{movie?.year}</p>
                    <svg width="20" height="20">
                        <circle cx="10" cy="10" r="3" fill= "white" />
                    </svg>
            <p>{movie?.ageCenzor}</p>
                    <svg width="20" height="20">
                        <circle cx="10" cy="10" r="3" fill= "white" />
                    </svg>
            {loginStatus ? favoriteHtmlBtn : null}
        </div>
    </div>
    <iframe className={style.urlMobile} src={movie?.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
    <div className={style.imgAndDescriptionMobile}>
        <div>
            <img className={style.imgItemMobile} src={`http://localhost:4840/assets/images/${movie?.path}`} alt="" />
        </div>
        <div className={style.descriptionMovieMobile}>{movie?.description}</div>
    </div>
    <div className={style.ratingMobile}>
        <div>
            <p>IMDB RATING</p>
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
);
}