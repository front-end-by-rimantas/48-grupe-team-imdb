
import style from './About.module.css';
import { Link } from 'react-router-dom';





export function About() {
    return (
      <div className={style.main}>
        <section className={style.left}>
          <h4 className={style.heading4}>
            Fabulous movie world.
          </h4>
          <h1 className={style.heading1}>About Us</h1>
          <p className={style.p}>
            IMDb is the world most popular and authoritative source for
            information on movies, TV shows, and celebrities. Products and
            services to help fans discover and decide what to watch and where to
            watch it include: the IMDb website for desktop and mobile devices;
            apps for iOS and Android; and, X-Ray on Prime Video. For
            entertainment industry professionals, IMDb provides IMDbPro and Box
            Office Mojo. IMDb licenses information from its vast and
            authoritative database to third-party businesses worldwide; learn
            more at developer.imdb.com. IMDb is an Amazon company.
          </p>
          <nav className={style.linksImg}>
            <Link className={style.btn} to="./contactUs">
              Contact us
            </Link>
            <Link className={style.btn} to="/sign-in/registration">
              Register
            </Link>
            <Link className={style.btn} to="/top-ten">
              Check out our top picks
            </Link>
          </nav>
        </section>
        <section className={style.rightSection}>
          <img
            className={style.imgThird}
            src={`http://localhost:4840/assets/images/titanic.jpg`}
          ></img>
          <img
            className={style.imgFirst}
            src={`http://localhost:4840/assets/images/thepianist.jpg`}
          ></img>
          <img
            className={style.imgSecond}
            src={`http://localhost:4840/assets/images/se7en.jpg`}
          ></img>
        </section>
      </div>
    );
}