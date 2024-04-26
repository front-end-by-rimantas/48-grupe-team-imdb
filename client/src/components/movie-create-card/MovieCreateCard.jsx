import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/imdb_logo.png";
import style from "./MovieCreateCard.module.css";

export function MovieCreateCard() {
  return (
    <div className={style.main}>
      <div className={style.logoBox}>
        <Link to="/">
          <img className={style.registrationLogo} src={logo} alt="Logo" />
        </Link>
      </div>
      <div className={style.form}>
        <span className={style.titleF}>
          <h1 className={style.titleF}>Create movie</h1>
        </span>
        <form className={style.context}>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="">
              Movie title
            </label>
            <input className={style.inputForm} type="text" placeholder="" />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="">
              Year
            </label>
            <input className={style.inputForm} type="number" placeholder="" />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="">
              Rating
            </label>
            <input className={style.inputForm} type="number" placeholder="" />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="">
              Category
            </label>
            <input className={style.inputForm} type="text" placeholder="" />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="">
              Age Cenzor
            </label>
            <input className={style.inputForm} type="text" placeholder=" " />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="">
              Awards
            </label>
            <input className={style.inputForm} type="text" placeholder=" " />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="">
              Gross
            </label>
            <input className={style.inputForm} type="text" placeholder=" " />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="youtubeUrl">
              YouTube URL
            </label>
            <input
              className={style.inputForm}
              type="url"
              id="youtubeUrl"
              placeholder="Enter YouTube URL"
            />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="imageUpload">
              Image
            </label>
            <input
              className={style.inputFormImg}
              type="file"
              id="imageUpload"
              accept="image/*"
            />
          </div>
          <div className={style.formRow}>
            <label className={style.label} htmlFor="description">
              Description
            </label>
            <textarea
              className={style.inputForm}
              id="description"
              placeholder="Enter description"
            />
          </div>
          <div className={style.formRow}>
            <button
              className={`${style.button} ${style.textButton}`}
              type="submit"
            >
              Create your movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
