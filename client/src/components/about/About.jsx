import style from './About.module.css';
import { Link } from 'react-router-dom';
import randomImg from '../../assets/images/citizenkane.jpg';
import randomImg1 from '../../assets/images/titanic.jpg';
import randomImg2 from '../../assets/images/thedarkknight.jpg';


export function About() {
    return (
        <div className={style.main}>
            <section className={style.left}>
               <h3><span>#</span>Fabulous movie world.</h3>
               <h1>About Us</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In atque laboriosam sequi aperiam adipisci modi
                 consectetur perspiciatis, placeat a, excepturi necessitatibus. Odio iusto tempore doloribus quo nesciunt explicabo delectus cum?</p>
                <nav className={style.links}>
                    <Link className={style.btn} to='./contactUs'>Contact us</Link>
                    <Link className={style.btn} to="/sign-in/registration">Register</Link>
                    <Link className={style.btn} to="/top-ten">Check out our top picks</Link>
                </nav>
            </section>
            <section style={style.right}>
                <img src={randomImg}></img>
                <img src={randomImg1}></img>
                <img src={randomImg2}></img>
            </section>
        </div>
    )
}