import { Link } from "react-router-dom";
import headerLogo from "../../assets/images/logo/imdb_logo.png";
import style from "./LogoImdb.module.css";

export function LogoImdb() {
    return (
        <Link to="/"><img className={style.logo} src={headerLogo} alt="Logo" /></Link>
    )
}