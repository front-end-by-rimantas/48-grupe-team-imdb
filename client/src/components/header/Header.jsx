import style from './Header.module.css';

export function Header() {
   return  (
    <header className={style.header}>
            <img src={<></>} alt="Logo" />
            <form>
                <input className={style.search}  type="text" placeholder='search'/>
            </form>
            <nav>
                <li>Sign In</li>
                <li>About</li>
                <li>Top 10</li>
            </nav>
        </header>
    )
}