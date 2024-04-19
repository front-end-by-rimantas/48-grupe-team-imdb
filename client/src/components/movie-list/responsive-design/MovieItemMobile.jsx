/* eslint-disable react/prop-types */

import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
// import { MdFavorite } from "react-icons/md";
import style from '../MovieItems.module.css';

export function MovieItemMobile({  movie }) {
    return (
<div className={`${style.bossMobile} ${style.containerInnerMobile}`}>
    <div className={style.heroSection}>
        <h1>{movie?.name}</h1>
    </div>
    <div className={style.containerItemInnerMobile}>
        <div>
            <iframe className={style.urlMobile} src={movie?.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
        </div>
    </div>
    <div className={style.imgAndDescriptionMobile}>
        <div>
            <img className={style.imgItemMobile} src={`http://localhost:4840/assets/images/${movie?.path}`} alt="" />
        </div>
        <div className={style.descriptionMovieMobile}>
            {movie?.description?.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </div>
    </div>
    <div className={style.rating}>
        <div>
            <div className={style.yellow}>
                <i className={style.yellowStar}><GoStarFill size="1.5rem" /> </i>
                <p>{movie?.rating}/10</p>
            </div>
        </div>
        <div>
            <div className={style.blue}>
                <i className={style.blueStar}><CiStar size="1.5rem" /> </i>
                <p className={style.blueRate}>Rate</p>
            </div>
        </div>
    </div>
</div>
);
}