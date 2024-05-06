import imdbLogo from '../../assets/images/logo/logoImdb.png';
import style from './LogoImdb.module.css'

export function LogoImdb() {
    return (
        <img className={style.headerLogo} src={imdbLogo} alt="" />
    )
}