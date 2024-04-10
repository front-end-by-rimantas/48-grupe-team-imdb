import { Link } from "react-router-dom"
import logo from '../../assets/images/logo/logoImdb.png'
import style from './Logo.module.css'


export function LogoImdb() {
    return (
        <Link  to="/"><img className={style.logo} src={logo} alt="" /></Link>
    )
}