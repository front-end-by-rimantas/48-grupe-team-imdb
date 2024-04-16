import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { SearchBar } from '../search/SearchBar'
import { LogoImdb } from '../logo/LogoImdb';
import { useState } from 'react';
import { IoIosSearch } from "react-icons/io"
import { GlobalContext } from '../../context/GlobalContext';
import { useContext } from 'react';


export function Header() {
const {loginStatus, updateLoginStatus} = useContext(GlobalContext);
const [searchText, setSearchText] = useState('');
const [wrongSearchText, setWrongText] = useState('');

    function handleSearchSectionChange (e){
        setSearchText(e.target.value)
    }

    function handleFormSubmit (e){
        e.preventDefault()

        if(!searchText.length){
           setWrongText('Enter at least one character')
        } else {setWrongText('')}

        console.log({searchText});
    }


    function handleSignOut() {
        updateLoginStatus(false)
    }

    const signInButton = (<Link className={style.navLink} to="/sign-in">Sign In</Link>);
    const signOutButton = (<button onClick={handleSignOut} className={style.navBtn}>Sign out</button>);

   return  (
    <header className={style.header}>
            <Link to="/"><LogoImdb/></Link>
            <div className={style.formList}> 
                <SearchBar />
            </div>
            <nav>
                {loginStatus ? signOutButton : signInButton}
                <Link className={style.navLink} to="/about">About</Link>
                <Link className={style.navLink} to="/top-ten">Top 10</Link>
            </nav>
    </header>
    )
}

