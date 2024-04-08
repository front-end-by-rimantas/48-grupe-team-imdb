import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { LogoImdb } from '../logo/LogoImdb';



export function Header() {
   return  (
    <header className={style.header}>
            <LogoImdb/>
            <form>
                <input className={style.search}  type="text" placeholder='search'/>
            </form>
            <nav>
                <Link className={style.navLink} to="/sign-in">Sign In</Link>
                <Link className={style.navLink} to="/about">About</Link>
                <Link className={style.navLink} to="/top-ten">Top 10</Link>
            </nav>
        </header>
    )
}