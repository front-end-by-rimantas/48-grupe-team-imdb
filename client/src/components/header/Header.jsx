import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { SearchBar } from '../search/SearchBar'
import { LogoImdb } from '../logo/LogoImdb';
import { GlobalContext } from '../../context/GlobalContext';
import { useContext } from 'react';

export function Header() {
const {loginStatus, updateLoginStatus} = useContext(GlobalContext);
   
    function handleSignOut() {
        updateLoginStatus(false)
    }

    const signInButton = (<Link className={style.navLink} to="/sign-in">Sign In</Link>);
    const signOutButton = (<button onClick={handleSignOut} className={style.navLink}>Sign out</button>);

   return  (
    <header className={style.header}>
            <Link to="/"><LogoImdb/></Link>
            <div className={style.formList}> 
                <SearchBar />
            </div>
            <nav>
                <Link className={style.navLink} to="/about">About</Link>
                <Link className={style.navLink} to="/top-ten">Top 10</Link>
                {loginStatus ? signOutButton : signInButton}
            </nav>
    </header>
    )
}

