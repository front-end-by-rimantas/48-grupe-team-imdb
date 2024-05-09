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
    category: "",
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

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`http://localhost:4840/movies/get/` + href);
        if (response.ok) {
          const movieData = await response.json();
          setFormData(movieData);
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
    setFormData({
      ...formData,
      [name]: value,
    });
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
