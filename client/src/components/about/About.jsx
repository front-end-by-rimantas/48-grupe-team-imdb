
import style from './About.module.css';
import { Link } from 'react-router-dom';





export function About() {
    return (
     <div className={style.main}>
           <section className={style.left}>
               <h4 className={style.heading4}><span>#</span>Fabulous movie world.</h4>
               <h1 className={style.heading1}>About Us</h1>
               <p className={style.p}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum, quam iusto magni id porro totam consectetur sit dolorum doloribus illo.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptas aut deleniti modi exercitationem eaque ipsum, aliquam odit. Delectus, repellendus?</p>
                 <nav className={style.linksImg}>
                    <Link className={style.btn} to='/jobs'>Jobs</Link>
                    <Link className={style.btn} to="/registration">Register</Link>
                    <Link className={style.btn} to="/top-ten">Check out our top picks</Link>
                </nav>
           </section>
           <section className={style.rightSection}>
               <img className={style.imgThird} src= {`http://localhost:4840/assets/images/titanic.jpg`}></img>
               <img className={style.imgFirst} src={`http://localhost:4840/assets/images/thepianist.jpg`}></img>
               <img className={style.imgSecond} src={`http://localhost:4840/assets/images/se7en.jpg`}></img>
           </section>
    </div>
    )
}
    

