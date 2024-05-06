/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { HiChevronDoubleRight } from "react-icons/hi2";
import style from './NotFound.module.css';

export function NotFound() {
    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.errorMessage}>
                    <p className={style.paragraphUrl}>
                        The requested URL was not found on our server.
                    </p>
                    <Link className={style.linkToHome} to="/">
                        Go to the homepage 
                    </Link>
                    <span className={style.iconDoubleArrow}>
                        < HiChevronDoubleRight />
                    </span>
                </div>
                <div className={style.errorBox}>
                    <div className={style.leftColumn}>
                        <h1 className={style.errTitle}>404</h1>
                        <p className={style.errParagraph}>ERROR</p>
                    </div>
                    <div className={style.rightColumn}>
                        <p className={style.paragraph}>
                            It's the one that says 'Page not found'.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}