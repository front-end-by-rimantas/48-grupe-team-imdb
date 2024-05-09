import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo/imdb_logo.png";
import style from "./MovieCreateCard.module.css";
import { MovieItem } from "../../movie-list/MovieItem.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from '../../../context/GlobalContext.jsx'
import movieDefaultImg from '../../../../../server/assets/imdb.png';

export function MovieCreateCard() {
  const { userId } = useContext(GlobalContext);
  console.log("User ID:", userId); 
  const [movies, setMovies] = useState([]);
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
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

    
    setFormData({
      userId: userId || "",
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
      path: "", 
    });
  }, [userId]);

  const [formData, setFormData] = useState({
    userId: "",
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
    path: "", 
  });

  const updateMovies = async () => {
    try {
      const response = await fetch("http://localhost:4840/movies/get");
      if (response.ok) {
        const data = await response.json();
        const userMovies = data.movies.filter(movie => movie.userId === userId);
        setMovies(userMovies);
      } else {
        console.error("Failed to fetch updated movies");
      }
    } catch (error) {
      console.error("Failed to fetch updated movies", error);
    }
  };

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

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
  
    const formData = new FormData();
    formData.append('movie_image', file);
  
    fetch('http://localhost:4840/movies/upload', {
      method: 'POST',
      body: formData,
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to upload image (${res.status} ${res.statusText})`);
      }
      return res.json();
    })
    .then(data => {
      if (data.type === 'success') {
        const fullPath = `http://localhost:4840/assets/images/${data.imgPath}`;
        setImage(fullPath);
        setFormData(prevFormData => ({
          ...prevFormData,
          path: data.imgPath,
        }));
      } else {
        console.error("Failed to upload image:", data.error);
      }
    })
    .catch(error => {
      console.error("Error uploading image:", error);
    });
  }
  
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
        const formDataWithUserId = {
          ...formData,
          userId: userId || "", 
        };
  
        const response = await fetch("http://localhost:4840/movies/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataWithUserId), 
        });
  
        if (response.ok) {
          console.log("Movie added successfully");
          setSuccessMessage("Movie added successfully");
          const newMovieResponse = await fetch("http://localhost:4840/movies/get");
          if (newMovieResponse.ok) {
            const newData = await newMovieResponse.json();
            const newMovie = newData.movies.find(movie => movie.userId === userId && movie.name === formData.name);
            if (newMovie) {
              setMovies(prevMovies => [...prevMovies, newMovie]);
              setFormData({
                userId: userId || "",
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
                path: newMovie.path, 
              });
              setImage('');
            }
          } else {
            console.error("Failed to fetch movies after adding a new movie");
          }
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
                <MovieItem key={index} data={movie} updateMovies={updateMovies} />
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
                <img src={image ? image : movieDefaultImg} alt="Movie photo" className={style.movieImg} />
                <input onChange={handleImageChange} type="file" id="image" />
            </div>
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
            {/* <div className={style.formRow}>
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
            </div> */}
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
