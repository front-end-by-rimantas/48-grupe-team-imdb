import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './InfoSection.module.css';
import axios from 'axios';

export function InfoSection() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        axios.get('http://localhost:4840/movies/get')
            .then(response => {
                const formattedMovies = response.data.movies.map(movie => {
                    const gross = parseFloat(movie.gross.replace(/\D/g, ''));
                    return { ...movie, gross };
                });
            
                const sortedMovies = formattedMovies.sort((a, b) => b.gross - a.gross);
                const topMovies = sortedMovies.slice(0, 10);
                setMovies(topMovies);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
                setError('Error fetching movie data. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
      <section className={style.infoSection}>
        <div className={style.topBar}>
          <div className={style.line}></div>
          <h2>Top Box Office (US)</h2>
          <Link to={`/movies/sorted`} className={style.itemUrl}>
            <div className={style.arrowButton}>{">"}</div>
          </Link>
        </div>
        <p>Weekend of March 29-31</p>
        <ol className={style.movieList}>
          {movies.map((movie, index) => (
            <li key={index}>
              <Link to={`/movies/get/${movie.href}`} className={style.itemUrl}>
                <div className={style.movieInfo}>
                  <div className={`${style.rank} ${style.movieNumber}`}>
                    <span>{index + 1}</span>
                    <div className={style.verticalLine}></div>
                  </div>
                  <div className={style.namePrice}>
                    <span className={style.movieTitle}>{movie.name}</span>
                    <span className={style.revenue}>{`$${movie.gross}`}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
        <a href="#" className={style.top}>
          Back to Top &#8593;
        </a>
      </section>
    );
}


