/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import style from './HeroSection.module.css'
import posterUrl from '../../../assets/images/avatar.jpg'

export function HeroSection() {
    return (
        <section className={style.heroSection}>
             <div className={style.movieInfo}>
                <Link to="/:id" className={style.nameUrl}>
                    <div className={style.movieName}>Avatar</div>
                </Link>
                <div className={style.poster}>
                <Link to="/:id" className={style.nameUrl}>
                    <img src={posterUrl} alt="" />
                </Link>
                </div>
            </div>
            <div className={style.arrowButtons}>
                <button className={style.prevButton}>{'<'}</button>
                <button className={style.nextButton}>{'>'}</button>
            </div>
        </section>
    )
}

{/* <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
<img src={logo} alt="Logo" width="40" height="32" />
</Link> */}