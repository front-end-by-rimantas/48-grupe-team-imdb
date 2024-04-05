/* eslint-disable react/prop-types */
import style from './HeroSection.module.css'
import posterUrl from '../../../assets/images/avatar.jpg'

export function HeroSection() {
   

    return (
        <section className={style.heroSection}>
             <div className={style.movieInfo}>
                <div className={style.movieName}>Avatar</div>
                <div className={style.poster}>
                    <img src={posterUrl} alt="" />
                </div>
            </div>
            <div className={style.arrowButtons}>
                <button className={style.prevButton}>{'<'}</button>
                <button className={style.nextButton}>{'>'}</button>
            </div>
        </section>
    )
}