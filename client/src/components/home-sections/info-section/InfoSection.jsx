import style from './InfoSection.module.css'
import { Link } from 'react-router-dom';

export function InfoSection() {
    return (
    <section className={style.infoSection}>
        <div className={style.topBar}>
            <div className={style.line}></div> 
            <h2>Top Box Office (US)</h2>
            <div className={style.arrowButton}>{'>'}</div>
      </div>
      <p>Weekend of March 29-31</p>
        <ol className={style.movieList}>
          <li>
            <Link to="/:id" className={style.itemUrl}>
            <div className={style.movieInfo}>
                <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>1</span>
                    <div className={style.verticalLine}></div>
                </div>
                <div className={style.namePrice}>
                    <span className={style.movieTitle}>Godzilla x Kong: The New Empire</span>
                    <span className={style.revenue}>$80M</span>
                </div>
            </div>
            </Link>
          </li>
          <li>
          <Link to="/:id" className={style.itemUrl}>
            <div className={style.movieInfo}>
                <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>2</span>
                    <div className={style.verticalLine}></div>
                </div>
                <div className={style.namePrice}>
                    <span className={style.movieTitle}>Matrix</span>
                    <span className={style.revenue}>$580M</span>
                </div>
            </div>
            </Link>
          </li>
          <li>
          <Link to="/:id" className={style.itemUrl}>
            <div className={style.movieInfo}>
                <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>3</span>
                    <div className={style.verticalLine}></div>
                </div>
                <div className={style.namePrice}>
                    <span className={style.movieTitle}>Kong Kong</span>
                    <span className={style.revenue}>$800M</span>
                </div>
            </div>
            </Link>
          </li>
          <li>
          <Link to="/:id" className={style.itemUrl}>
            <div className={style.movieInfo}>
                <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>4</span>
                    <div className={style.verticalLine}></div>
                </div>
                <div className={style.namePrice}>
                    <span className={style.movieTitle}>Spider</span>
                    <span className={style.revenue}>$500M</span>
                </div>
            </div>
            </Link>
          </li>
          <li>
          <Link to="/:id" className={style.itemUrl}>
            <div className={style.movieInfo}>
                <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>5</span>
                    <div className={style.verticalLine}></div>
                </div>
                <div className={style.namePrice}>
                    <span className={style.movieTitle}>Traktoriukas</span>
                    <span className={style.revenue}>$0M</span>
                </div>
            </div>
            </Link>
          </li>
          <li>
          <Link to="/:id" className={style.itemUrl}>
            <div className={style.movieInfo}>
                <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>6</span>
                    <div className={style.verticalLine}></div>
                </div>
                <div className={style.namePrice}>
                    <span className={style.movieTitle}>BOOOM</span>
                    <span className={style.revenue}>$5000M</span>
                </div>
            </div>
            </Link>
          </li>
          <li>
          <Link to="/:id" className={style.itemUrl}>
            <div className={style.movieInfo}>
                <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>7</span>
                    <div className={style.verticalLine}></div>
                </div>
                <div className={style.namePrice}>
                    <span className={style.movieTitle}>WOW</span>
                    <span className={style.revenue}>$80M</span>
                </div>
            </div>
            </Link>
          </li>
          <li>
          <Link to="/:id" className={style.itemUrl}>
            <div className={style.movieInfo}>
                <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>8</span>
                    <div className={style.verticalLine}></div>
                </div>
                <div className={style.namePrice}>
                    <span className={style.movieTitle}>Finished</span>
                    <span className={style.revenue}>$8M</span>
                </div>
            </div>
            </Link>
          </li>
        </ol>
    </section>
    );
  }
  
