import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/images/logo/imdb_logo.png";
import style from "./MovieCreateCard.module.css";
import { useState, useEffect } from "react";

export function MovieEditCard() {
  const navigate = useNavigate();
  const { href } = useParams();
  const [formData, setFormData] = useState({
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
    path: "",
  });
  const [movieId, setMovieId] = useState(null); 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [yearError, setYearError] = useState("");
  const [ratingError, setRatingError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`http://localhost:4840/movies/get/` + href);
        if (response.ok) {
          const movieData = await response.json();
          console.log("Movie Data:", movieData);
          const categories = movieData.category.split('/');
          setFormData({
            ...movieData,
            category1: categories[0] || "",
            category2: categories[1] || "",
            category3: categories[2] || "",
          });
          setMovieId(movieData.id); 
          console.log(formData.path);
        } else {
          console.error("Failed to fetch movie");
        }
      } catch (error) {
        console.error("Failed to fetch movie", error);
      }
    }
    fetchMovie();
  }, [href]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Category 1:", formData.category1);
    console.log("Category 2:", formData.category2);
    console.log("Category 3:", formData.category3);

    if (name === "rating") {
      if (value < 1 || value > 10) {
        setRatingError("Rating should be between 1 - 10");
        return;
      }
      const newValue = parseInt(value);
      setFormData({
        ...formData,
        [name]: newValue,
      });
      setRatingError(""); 
    } 
    
    else if (name === "awards") {
      const newValue = Math.max(parseFloat(value), 0);
      setFormData({
        ...formData,
        [name]: newValue,
      });
    } 
    else if (name === "gross") {
      const newValue = Math.max(parseFloat(value), 0);
      setFormData({
        ...formData,
        [name]: newValue,
      });
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
      const hrefValue = value.trim().toLowerCase().replace(/\s+/g, '-');
      setFormData({
        ...formData,
        [name]: value,
        href: hrefValue,
      });
    } 
    else if (name === "year") {
      const newValue = value.replace(/\D/g, ''); 
      let newYear = parseInt(newValue);
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
        setErrorMessage("URL should start with 'https://www.youtube.com/embed/'");
      } else {
        setErrorMessage(""); 
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
  
      const category1 = formData.category1 || "";
      const category2 = formData.category2 || "";
      const category3 = formData.category3 || "";
      const category = [category1, category2, category3].filter(Boolean).join('/');
      console.log("Combined categories:", category); 
    }
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formDataToUpdate = new FormData();
    formDataToUpdate.append('movie_image', file);
  
    fetch('http://localhost:4840/movies/upload', {
      method: 'POST',
      body: formDataToUpdate,
    })
      .then(res => res.json())
      .then(data => {
        if (data.type === 'success') {
          setFormData(prevFormData => ({
            ...prevFormData,
            path: data.imgPath,
          }));
        }
      })
      .catch(console.error);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedCategories = [formData.category1, formData.category2, formData.category3].filter(Boolean).join('/');
      formData.category = combinedCategories;
  
      const response = await fetch(`http://localhost:4840/movies/update/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Movie updated successfully");
        setSuccessMessage("Movie updated successfully");
        setTimeout(() => {
          console.log("Navigating to /movies/get");
          navigate('/movies/get');
        }, 2000);
      } else {
        console.error("Failed to update movie");
        setErrorMessage("Failed to update movie");
      }
    } catch (error) {
      console.error("Failed to update movie", error);
    }
  };

  console.log(formData.path);
  return (
    <div className={style.container}>
      <div className={style.leftColumn}>
        <div className={style.logoBox}>
          <Link to="/">
            <img className={style.registrationLogo} src={logo} alt="Logo" />
          </Link>
        </div>
        <div className={style.form}>
          <span className={style.titleF}>
            <h1 className={style.titleF}>Edit movie</h1>
          </span>
          <form className={style.context} onSubmit={handleSubmit}>
            <div className={style.formRow}>
              <img src={`http://localhost:4840/assets/images/${formData.path}`} alt="Current Movie" className={style.movieImg} />
              <input onChange={handleImageChange} type="file" id="movie_image" />
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
                type="text"
                pattern="[0-9]*" 
                id="year"
                name="year"
                value={formData.year || ""}
                onChange={handleChange}
                placeholder="the year the film was released"
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
                type="number"
                id="awards"
                name="awards"
                value={formData.awards || ""}
                onChange={handleChange}
                placeholder="How many Oscars"
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label} htmlFor="gross">
                Gross (Millions $) *
              </label>
              <input
                className={style.inputForm}
                type="number"
                step="0.1"
                id="gross"
                name="gross"
                value={formData.gross || ""}
                onChange={handleChange}
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
              {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
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
                placeholder="Write description about movie..."
              />
            </div>
            <p>* - Required Fields</p>
            <div className={style.formRow}>
              <button
                className={`${style.button} ${style.textButton}`}
                type="submit"
              >
                Update your movie
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
