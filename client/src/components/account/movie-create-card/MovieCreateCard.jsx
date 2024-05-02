import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo/imdb_logo.png";
import style from "./MovieCreateCard.module.css";
import { MovieItem } from "../../movie-list/MovieItem.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from '../../../context/GlobalContext.jsx'

export function MovieCreateCard() {
  const { userId } = useContext(GlobalContext);
  const [movies, setMovies] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    rating: "",
    category: "",
    ageCenzor: "",
    awards: "",
    gross: "",
    url: "",
    description: "",
    href: "",
  });

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("http://localhost:4840/movies/get");
        if (response.ok) {
          const data = await response.json();
          const userMovies = data.movies.filter(movie => movie.userId === userId);
          setMovies(userMovies);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    }

    fetchMovies();
  }, [userId]);
  
  const requiredFields = () => {
    return (
      formData.name &&
      formData.year &&
      formData.rating &&
      formData.category &&
      formData.gross &&
      formData.url &&
      formData.href
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requiredFields()) {
      try {
        const response = await fetch("http://localhost:4840/movies/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Movie added successfully");
          setSuccessMessage("Movie added successfully");
        } else {
          console.error("Failed to add movie");
        }
      } catch (error) {
        console.error("Failed to add movie", error);
      }
    } else {
      setErrorMessage("Please fill all required fields");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.rightColumn}>
        <div className={style.boss}>
          <div className={style.titleList}>
            <h1>My movie list</h1>
          </div>
          <div className={style.containerList}>
            <div className={style.itemList}>
              {movies.map((movie, index) => (
                <MovieItem key={index} data={movie} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={style.leftColumn}>
        <div className={style.logoBox}>
          <Link to="/">
            <img className={style.registrationLogo} src={logo} alt="Logo" />
          </Link>
        </div>
        <div className={style.form}>
          <span className={style.titleF}>
            <h1 className={style.titleF}>Create movie</h1>
          </span>
          <form className={style.context} onSubmit={handleSubmit}>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="name">
                Movie title *
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="year">
                Year *
              </label>
              <input
                className={style.inputForm}
                type="number"
                id="year"
                name="year"
                value={formData.year || ""}
                onChange={handleChange}
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="rating">
                Rating *
              </label>
              <input
                className={style.inputForm}
                type="number"
                id="rating"
                name="rating"
                value={formData.rating || ""}
                onChange={handleChange}
                placeholder="IMDB Rating"
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="category">
                Category *
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="category"
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                placeholder="Action/Comedy/etc.."
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="ageCenzor">
                ageCenzor
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="ageCenzor"
                name="ageCenzor"
                value={formData.ageCenzor || ""}
                onChange={handleChange}
                placeholder="G/PG/PG-13/R/NC17"
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="awards">
                Awards
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="awards"
                name="awards"
                value={formData.awards || ""}
                onChange={handleChange}
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="gross">
                Gross *
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="gross"
                name="gross"
                value={formData.gross || ""}
                onChange={handleChange}
                placeholder="Example: $100 million"
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="url">
                Url *
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="url"
                name="url"
                value={formData.url || ""}
                onChange={handleChange}
                placeholder="ENTER:https://youtube.com/embed/your-youtube"
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="path">
                Path to image *
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="path"
                name="path"
                value={formData.path || ""}
                onChange={handleChange}
                placeholder="Enter image name (example.jpg)"
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="description">
                Description
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="href">
                Address Name *
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="href"
                name="href"
                value={formData.href || ""}
                onChange={handleChange}
                placeholder="localhost/movies/get/ENTER:your-address-name"
              />
            </div>
            <p>* - Required Fields</p>
            <div className={style.formRow}>
              <button
                className={`${style.button} ${style.textButton}`}
                type="submit"
              >
                Create your movie
              </button>
            </div>
          </form>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
