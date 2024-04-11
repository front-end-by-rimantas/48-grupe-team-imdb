import style from './About.module.css';
import { Link } from 'react-router-dom';
import  randomImg  from '../../assets/images/titanic.jpg';
import  randomImg1  from '../../assets/images/thepianist.jpg';
import  randomImg2  from '../../assets/images/se7en.jpg';



export function About() {
    return (
     <div className={style.main}>
           <section className={style.left}>
               <h4 className={style.heading4}><span>#</span>Fabulous movie world.</h4>
               <h1 className={style.heading1}>About Us</h1>
               <p className={style.p}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptas aut deleniti modi exercitationem eaque ipsum, aliquam odit. Delectus, repellendus?</p>
                 <nav className={style.linksImg}>
                    <Link className={style.btn} to='./contactUs'>Contact us</Link>
                    <Link className={style.btn} to="/sign-in/registration">Register</Link>
                    <Link className={style.btn} to="/top-ten">Check out our top picks</Link>
                </nav>
           </section>
           <section style={style.right}>
           <img className={style.imgThird} src= { randomImg2}></img>
            <img className={style.imgFirst} src={ randomImg }></img>
            <img className={style.imgSecond} src={ randomImg1}></img>
           </section>
    </div>
    )
}
    