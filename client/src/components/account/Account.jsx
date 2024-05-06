import { Link } from 'react-router-dom';
import style from './Account.module.css';

export function Account() {
    return (
      <div>
        <section className={style.page}>
          <div className={style.heroContainer}>
            <div className={style.imgContainer}>
              <img
                className={style.heroImage}
                src="http://localhost:4840/assets/images/jobsimg/hero.webp"
                alt="heroImage"
              />
            </div>
            <div className={style.heroBoxContainer}>

              <div className={style.heroBox}>
                <div className={style.heroContent}>
                  <div className={style.content}>
                    <img
                      className={style.logoImg}
                      src="http://localhost:4840/assets/images/jobsimg/imdblogo.png"
                      alt="heroImage"
                    />
                    <h1 className={style.title}>My favorite films</h1>
                    <div>
                      <Link className={style.btn} to="/account/favorite-movies">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.heroBox}>
                <div className={style.heroContent}>
                  <div className={style.content}>
                    <img
                      className={style.logoImg}
                      src="http://localhost:4840/assets/images/jobsimg/imdblogo.png"
                      alt="heroImage"
                    />
                    <h1 className={style.title}>My movies</h1>
                    <div>
                      <Link className={style.btn} to="/account/movie-create">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    );
}