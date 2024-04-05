import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { LogoImdb } from '../logo/LogoImdb';
import { useState } from 'react';



export function Header() {

const [searchText, setSearchText] = useState('');
const [wrongSearchText, setWrongText] = useState('');



function handleSearchSectionChange (e){
    setSearchText(e.target.value)
}

function isNameLenghtOk (x){
  if (x.length!==0){
    return true 
  }
}

function handleFormSubmit (e){
    e.preventDefault()

    if(!isNameLenghtOk(searchText)){
       setWrongText('Įveskite bent vieną raidę')
    } else {setWrongText('')}

    console.log({searchText});
}



   return  (
    <header className={style.header}>
            <LogoImdb/>
            <div className={style.formList}> 
               <form className={style.searchForm}onSubmit={handleFormSubmit}>
                  <input value={searchText} onChange={handleSearchSectionChange} className={style.search}  type="text" placeholder='Enter film name'/>
                  {wrongSearchText!==0 ? <button className={style.btnSearch} type='submit'>Search</button>:
                  <Link to="/search">
                    <button>go</button>
                   </Link>}
               </form>
               {wrongSearchText.length === 0? null : <p className={style.error}>{wrongSearchText}</p>}
            </div>
            {/* <p className={style.error}>{searchText}</p> */}
            <nav>
                <Link className={style.navLink} to="/sign-in">Sign In</Link>
                <Link className={style.navLink} to="/about">About</Link>
                <Link className={style.navLink} to="/top-ten">Top 10</Link>
            </nav>
    </header>
    )
}

