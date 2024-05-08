/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import style from "./MovieItemInner.module.css";
import { MdFavorite } from "react-icons/md";
import { GlobalContext } from "../../../context/GlobalContext";


export function MovieItemInner() {
  const { href } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    userId,
    favoriteData,
    loginStatus,
    updateFavoriteData,
    deleteFavoriteData,
  } = useContext(GlobalContext);
  const [favoriteBtn, setFavoriteBtn] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(10);

  const favoriteMoviesHrefArr = [];
  let favoriteId = "favoriteId";
  let isInArr = false;

    for (const data of favoriteData) {
        if (data.userId === userId) {
            favoriteMoviesHrefArr.push(data.href);
            if (data.href === href) {
                favoriteId = data.id;
                isInArr = true;
            }
        }
    } 
    const addedFavoriteMsg = (<p className={isInArr ? style.favoriteMessage : style.off}>Added to favorite</p>);
    const removedFavoritesMsg = (<p className={!isInArr ? style.favoriteMessageRemove : style.off}>Removed from favorites</p>);
    const activeFavoriteBtn = (<span className={style.favoriteIconActive}><MdFavorite/></span>);
    const inactiveFavoriteBtn = (<span className={style.favoriteIconInactive}><MdFavorite/></span>);
    const favoriteHtmlBtn = (
        <button className={style.favoriteBtn}  onClick={() => handleFavorite(favoriteBtn)} >
            {favoriteMoviesHrefArr.includes(href) ? activeFavoriteBtn : inactiveFavoriteBtn}
        </button>
    );

  useEffect(() => {
    axios
      .get(`http://localhost:4840/movies/get/${href}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        setError("Error fetching movie data. Please try again later.");
        setLoading(false);
      });
  }, [href]);

  if (loading) {
    return <div>Loading...</div>;
  }

    if (error) {
        return <div>{error}</div>;
    }
    
    function handleFavorite (favoriteBtn) {
        setFavoriteBtn(!favoriteBtn);
    
        if(isInArr === false) {
            fetch('http://localhost:4840/user/favorite', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        href,
                        userId,
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        updateFavoriteData(data.favoriteArr)
                    })
                    .catch(e => console.error(e));
        } else {
            fetch('http://localhost:4840/user/favorite/' + favoriteId, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.message === 'favorite deleted') {
                        deleteFavoriteData(favoriteId);
                    }
                })
                .catch(console.error); 
        }  
    }
       
    function onMovieRate(rating) {
        setRating(rating);
    
        fetch("http://localhost:4840/movies/set-rate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            userId,
            movieId: movie.id,
            rate: rating,
          }),
        })
        //   .then((res) => res.json())
          .then((data) => {
            console.log("--> rating res", data);
          })
          .catch(console.error);
      }
    
    return (
            <main className={style.container}>  
                <div className={`${style.boss} ${style.containerInner}`}>
                    <div className={style.nameAndRating}>
                        <h1>{movie?.name}</h1>
                        <div className = {style.underName}>
                            <p>{movie?.year}</p>
                            <svg width="20" height="20">
                              <circle cx="10" cy="10" r="3" fill="white" />
                            </svg>
                            <p>{movie?.ageCenzor}</p>
                            <svg width="20" height="20">
                              <circle cx="10" cy="10" r="3" fill="white" />
                            </svg>
                            <p>{movie?.category}</p>
                            <svg width="20" height="20">
                              <circle cx="10" cy="10" r="3" fill="white" />
                            </svg>
                            {loginStatus ? favoriteHtmlBtn : null}
                            {isInArr ? addedFavoriteMsg : removedFavoritesMsg}
                        </div>
                    </div>
                    <div className={style.rating}>
                        <div>
                            <p>IMDB RATING</p>
                            <div className={style.yellow}>
                              <i className={style.yellowStar}>
                                <GoStarFill size="1.5rem" />
                              </i>
                              <p>{movie?.rating}/10</p>
                            </div>
                          </div>
                          <div>
                            <p>YOUR RATING</p>
                            <div className={style.blue}>
                              {/* <i className={style.blueStar}>
                                <CiStar size="1.5rem" />
                              </i> */}
                              {/* <p className={style.blueRate}>Rate</p> */}
                              {[...Array(totalStars)].map((star, index) => {
                                const currentRating = index + 1;

                                return (
                                  <label key={index}>
                                    <input
                                      className={style.rateInput}
                                      type="radio"
                                      name="rating"
                                      value={currentRating}
                                      onChange={() =>
                                        onMovieRate(currentRating)
                                      }
                                    />
                                    <span
                                      className="star"
                                      style={{
                                        color:
                                          currentRating <= (hover || rating)
                                            ? "#ffc107"
                                            : "#e4e5e9",
                                      }}
                                      onMouseEnter={() =>
                                        setHover(currentRating)
                                      }
                                      onMouseLeave={() => setHover(null)}
                                    >
                                      &#9733;
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className={style.imgBox}>
                            <img
                              className={style.imgItem}
                              src={`http://localhost:4840/assets/images/${movie?.path}`}
                              alt=""
                            />
                        </div>
                        <div className={style.videoBox}>
                            < iframe 
                              className={style.url}
                              src={movie?.url}
                              title="YouTube video player"
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                        </div>
                      <div className={style.descriptionMovie}>
                        {movie?.description?.split("\n").map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                  </div>
            </main>
  );
}