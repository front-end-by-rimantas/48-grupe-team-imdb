import { Link, useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import { SearchBar } from '../search/SearchBar';
import { LogoImdb } from '../logo/LogoImdb';
import { GlobalContext } from '../../context/GlobalContext';
import { useContext, useState } from 'react';
import { LuMenuSquare } from "react-icons/lu";
import { IoClose, IoSearch } from "react-icons/io5";

export function Header() {
    const navigate = useNavigate();
    const {loginStatus, updateLoginStatus} = useContext(GlobalContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(true);

    const searchBtn = (<span className={style.searchBtn}><IoSearch /></span>);
    const closeSearchBtn = (<span className={style.closeSearchBtn}><IoClose /></span>);

    const openMenuBtn = (<span className={style.menuBtn}><LuMenuSquare /></span>);
    const closeMenuBtn = (<span className={style.closeMenuBtn}><LuMenuSquare /></span>);

    const signInButton = (<Link className={style.navLink} to="/sign-in">Sign In</Link>);
    const signOutButton = (<button onClick={handleSignOut} className={style.navLink + ' ' + style.signOutBtn}>Sign out</button>);

    const signInUser = (<Link className={style.navLink} to="/favorite-movies">My Favorit Movies</Link>)
    const movieList = (<Link className={style.navLink} to="/movies/get">Movie List</Link>)

    function handleSignOut() {
        updateLoginStatus(false);
        navigate('/')
    }

   return  (
    <header className={searchOpen ? style.headerStandart : style.headerSearch} >
            <div className={searchOpen ? style.logoBox : style.logoBoxClose}>
                <Link className={style.headerLogo} to="/"><LogoImdb/></Link>
            </div>
            <div className={searchOpen ? style.searchBox : style.searchBoxClose}> 
                <SearchBar />
            </div>
            <div className={style.menuBtnBox}>
                <span className={searchOpen ? style.searchBtn : style.searchBtnClose} 
                    onClick={() => {setSearchOpen(!searchOpen)}}>{searchOpen ? searchBtn : closeSearchBtn}
                </span>
                <span className={searchOpen ? style.menuBtn : style.menuBtnClose} 
                    onClick={() => {setMenuOpen(!menuOpen)}} >{menuOpen ? openMenuBtn : closeMenuBtn}
                </span>
            </div>
            <div className={menuOpen ? style.navLinkBox : style.navLinkBoxClose}>
                <nav>
                    {loginStatus ? movieList :null}
                    {loginStatus ? signInUser : null}
                    <Link className={style.navLink} to="/about">About</Link>
                    <Link className={style.navLink} to="/top-ten">Top 10</Link>
                    {loginStatus ? signOutButton : signInButton}
                </nav>
            </div>
    </header>
    );
}

