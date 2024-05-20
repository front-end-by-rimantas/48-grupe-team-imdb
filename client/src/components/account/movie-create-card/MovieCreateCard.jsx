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
  const [movies, setMovies] = useState([]);
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearError, setYearError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [titleLimit, setTitleLimit] = useState("");
  const [grossLimit, setGrossLimit] = useState("");
  const [awardsLimit, setAwardsLimit] = useState("");

  
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
  
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    year: "",
    rating: "",
    category1: "",
    category2: "",
    category3: "",
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
      formData.category1 &&
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
    if (name === "rating") {
      const rating = parseFloat(value);
      if ((!isNaN(rating) && rating >= 1 && rating <= 10) || value === "") {
        setFormData({
          ...formData,
          [name]: parseFloat(value),
        });
        setRatingError(""); 
      } else {
        setRatingError("Rating should be a number between 1 and 10");
      }
    }
  
    else if (name === "awards") {
      const newValue = value.replace(/\D/g, '');
      if (newValue.length > 5) {
          setAwardsLimit("Exceeds maximum length");
          return; 
        } else {
            setAwardsLimit("");
        }
      
      const parsedValue = parseFloat(newValue);
      if (!isNaN(parsedValue) || newValue === "") {
          setFormData({
              ...formData,
              [name]: newValue === "" ? "" : parsedValue.toString(),
          });
      } else {
          setAwardsLimit("Invalid input");
      }
    }

    else if (name === "gross") {
      const newValue = value.replace(/\D/g, '');
      if (newValue.length > 5) {
        setGrossLimit("Exceeds maximum length");
        return; 
        } else {
            setGrossLimit("");
        }
      
      const parsedValue = parseFloat(newValue);
      if (!isNaN(parsedValue) || newValue === "") {
          setFormData({
              ...formData,
              [name]: newValue === "" ? "" : parsedValue.toString(),
          });
      } else {
          setGrossLimit("Exceeds maximum length");
      }
  }

    else if (name === "ageCenzor") {
      const allowedValues = ["G", "PG", "PG-13", "R", "NC-17"];
      if (allowedValues.includes(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      } else {
        console.error("Invalid age censor value");
      }
    } 

    else if (name === "name") {
      const maxLength = 50;
      const trimmedValue = value.trim();
      if (trimmedValue.length <= maxLength) {
          setTitleLimit("");
          const hrefValue = trimmedValue.toLowerCase().replace(/\s+/g, '-');
          setFormData({
              ...formData,
              [name]: trimmedValue,
              href: hrefValue,
          });
      } else {
          setTitleLimit("Exceeds maximum length");
      }
  }

    else if (name === "year") {
      const newValue = value.replace(/\D/g, ''); 
      if (newValue === "") {
          setYearError("");
          setFormData({
              ...formData,
              [name]: "",
          });
          return;
      }
      let newYear = parseInt(newValue);
      if (isNaN(newYear)) {
          setYearError("Invalid year");
          return; 
      }
      if (newYear < 1800) {
          setYearError("Date is too old");
      } else if (newYear > new Date().getFullYear()) {
          setYearError("Future date is not allowed");
      } else {
          setYearError(""); 
      }
      setFormData({
          ...formData,
          [name]: newYear.toString(),
      });
  }

    else if (name === "url") {
      if (!value.startsWith("https://www.youtube.com/embed/")) {
        setUrlError("URL should start with 'https://www.youtube.com/embed/'");
      } else {
        setUrlError(""); 
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    }
   else if (name === "category1" || name === "category2" || name === "category3") {
    setFormData({
        ...formData,
        [name]: value,
    });

    // const category1 = formData.category1 || "";
    // const category2 = formData.category2 || "";
    // const category3 = formData.category3 || "";
    // const category = [category1, category2, category3].filter(Boolean).join(', ');
    // console.log("Combined categories:", category); 
}
     else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requiredFields()) {
      try {
        const formDataWithUserId = {
          ...formData,
          userId: userId || "", 
        };
  
        const combinedCategories = [formData.category1, formData.category2, formData.category3].filter(Boolean).join(', ');
        formDataWithUserId.category = combinedCategories;
        
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
                category1: "",
                category2: "",
                category3: "",
                ageCenzor: "",
                awards: "",
                gross: "",
                url: "",
                description: "",
                href: "",
                path: newMovie.path, 
              });
              setImage('');
              setErrorMessage("");
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
      setSuccessMessage("");
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
              {titleLimit && <p className={style.errorMessage}>{titleLimit}</p>}
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="year">
                Year *
              </label>
              <input
                className={style.inputForm}
                type="text"
                pattern="[0-9]*" 
                id="year"
                name="year"
                value={formData.year || ""}
                onChange={handleChange}
                placeholder="enter year the movie was released"
                autoComplete="off"
              />
              {yearError && <p className={style.errorMessage}>{yearError}</p>}
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="rating">
                Rating (1 - 10) *
              </label>
              <input
                className={style.inputForm}
                type="number"
                step="any"
                id="rating"
                name="rating"
                value={formData.rating || ""}
                onChange={handleChange}
                placeholder="IMDB Rating"
              />
              {ratingError && <p className={style.errorMessage}>{ratingError}</p>}
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="category1">
                Category 1 *
              </label>
              <select
                className={style.inputForm}
                id="category1"
                name="category1"
                value={formData.category1}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction (Sci-Fi)</option>
                <option value="Thriller">Thriller</option>
                <option value="Adventure">Adventure</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Documentary">Documentary</option>
              </select>
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="category2">
                Category 2
              </label>
              <select
                className={style.inputForm}
                id="category2"
                name="category2"
                value={formData.category2}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction (Sci-Fi)</option>
                <option value="Thriller">Thriller</option>
                <option value="Adventure">Adventure</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Documentary">Documentary</option>
              </select>
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="category3">
                Category 3
              </label>
              <select
                className={style.inputForm}
                id="category3"
                name="category3"
                value={formData.category3}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction (Sci-Fi)</option>
                <option value="Thriller">Thriller</option>
                <option value="Adventure">Adventure</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Documentary">Documentary</option>
              </select>
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="ageCenzor">
                Age Censor
              </label>
              <select
                className={style.inputForm}
                id="ageCenzor"
                name="ageCenzor"
                value={formData.ageCenzor || ""}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="G">G - For all audiences</option>
                <option value="PG">PG - Parental Guidance Suggested</option>
                <option value="PG-13">PG-13 - Parental Guidance Suggested for children under 13</option>
                <option value="R">R - Under 17 not admitted without parent or guardian</option>
                <option value="NC-17">NC-17 - Under 17 not admitted</option>
              </select>
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
                placeholder="How many Oscars"
              />
              {awardsLimit && <p className={style.errorMessage}>{awardsLimit}</p>}
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="gross">
                Gross (Millions $) *
              </label>
              <input
                className={style.inputForm}
                type="text"
                id="gross"
                name="gross"
                value={formData.gross || ""}
                onChange={handleChange}
              />
              {grossLimit && <p className={style.errorMessage}>{grossLimit}</p>}
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
              {urlError && <p className={style.errorMessage}>{urlError}</p>}
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="description">
                Description
              </label>
              <textarea
                className={style.inputForm}
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Write description about movie..."
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
