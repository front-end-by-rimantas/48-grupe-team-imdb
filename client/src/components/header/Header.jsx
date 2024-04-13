import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { LogoImdb } from '../logo/LogoImdb';
import { useState } from 'react';
import { IoIosSearch } from "react-icons/io"


export function Header() {

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



   return  (
    <header className={style.header}>
            <Link to="/"><LogoImdb/></Link>
            
            <div className={style.formList}> 
               <form className={style.searchForm}onSubmit={handleFormSubmit}>
                  <input value={searchText} onChange={handleSearchSectionChange} className={style.search}  type="text" placeholder='Search IMdb' />
                  <button className={style.btnSearch} type='submit' onClick={handleFormSubmit} ><IoIosSearch /></button>
               </form>
               {wrongSearchText===''?  null : <p className={style.error}>{wrongSearchText}</p>}
            </div>
            <nav>
                <Link className={style.navLink} to="/sign-in">Sign In</Link>
                <Link className={style.navLink} to="/about">About</Link>
                <Link className={style.navLink} to="/top-ten">Top 10</Link>
            </nav>
    </header>
    )
}

