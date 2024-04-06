/* eslint-disable react/prop-types */
import style from './HeroSection.module.css'
import posterUrl from '../../../assets/images/avatar.jpg'

export function HeroSection() {
    return (
        <section className={style.heroSection}>
             <div className={style.movieInfo}>
                <a className={style.nameUrl} href="#">
                <div className={style.movieName}>Avatar</div>
                </a>
                <div className={style.poster}>
                <a className={style.nameUrl} href="#">
                    <img src={posterUrl} alt="" />
                </a>
                </div>
            </div>
            <div className={style.arrowButtons}>
                <button className={style.prevButton}>{'<'}</button>
                <button className={style.nextButton}>{'>'}</button>
            </div>
        </section>
    )
}