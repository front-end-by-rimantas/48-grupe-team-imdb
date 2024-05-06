import { Link } from 'react-router-dom';
import {
  FaTiktok,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebookSquare,
  FaExternalLinkAlt,
} from "react-icons/fa";
import style from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={style.footerContainer}>
      <div className={style.contentContainer}>
        <div className={style.footerLinks}>
          <section className={style.socialsPresentation}>
            <div className={style.socialsContainer}>
              <h3>Follow IMDb on social</h3>
              <div className={style.socialsList}>
                <a
                  className={style.socials}
                  href="https://www.tiktok.com/@imdb"
                >
                  <FaTiktok size="2rem" />
                </a>
                <a
                  className={style.socials}
                  href="https://www.instagram.com/imdb"
                >
                  <FaInstagram size="2rem" />
                </a>
                <a className={style.socials} href="https://twitter.com/imdb">
                  <FaTwitter size="2rem" />
                </a>
                <a
                  className={style.socials}
                  href="https://www.youtube.com/imdb"
                >
                  <FaYoutube size="2rem" />
                </a>
                <a
                  className={`${style.socialFb} ${style.socials}`}
                  href="https://www.facebook.com/imdb"
                >
                  <FaFacebookSquare size="2rem" />
                </a>
              </div>
            </div>
            <div className={style.presentationContainer}>
              <div className={style.presentationList}>
                <Link to="/help" className={style.presentation}>
                  Help
                  <FaExternalLinkAlt
                    size="0.9rem"
                    className="linkAlt"
                    style={{ marginLeft: "5px" }}
                  />
                </Link>
                <Link to="/jobs"
                  className={`${style.presentation} ${style.presentationListContact}`}
                >
                  Jobs
                  <FaExternalLinkAlt
                    size="0.9rem"
                    className="linkAlt"
                    style={{ marginLeft: "5px" }}
                  />
                </Link>
                <Link to='/terms' className={style.presentation}>
                  Condition of use
                  <FaExternalLinkAlt
                    size="0.9rem"
                    className="linkAlt"
                    style={{ marginLeft: "5px" }}
                  />
                </Link>
                <Link to="/privacy-policy" className={style.presentation}>
                  Privacy policy
                  <FaExternalLinkAlt
                    size="0.9rem"
                    style={{ marginLeft: "5px" }}
                  />
                </Link>
              </div>
            </div>
          </section>
        </div>
        <p>&copy; 1990-2024 by IMDb.com, Inc.</p>
      </div>
    </footer>
  );
}
