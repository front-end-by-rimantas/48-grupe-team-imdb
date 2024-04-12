/* eslint-disable no-empty-pattern */
import style from './MovieItems.module.css';
import data from './data.json';
import { useParams } from 'react-router-dom';
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";

export function MovieItemInner({ }) {


 // const fetchData = () => {
  //   fetch("http://localhost:4840/api/movies")  ????? REIKIA PAKLAUSTI ??????
  //     .then((res) => res.json())
  //     .then((data) => {
  //      .then(data => {
  //      setAnswer(JSON.stringify(movies));
  //     });
  //    .catch(e => console.error(e));
  // };
  // const handleChange = (event) => {
  //           e.preventDefault();
  //             fetchData(event);
  // };
        const { id } = useParams();
        for(const key of data){ //data pokialsti movies
            if(key.href === id){

        return (
       <div className={`${style.boss} ${style.containerInner}`}>
            <div className={style.heroSection}>
                <div>
                    <h1>{key.name}</h1>
                    <ul className = {style.underName}>
                        <li>{key.year}</li>
                        <li>{key.rating}</li>
                    </ul>
                </div>
                <div className={style.rating}>
                    <div>
                        <p>IMDb RATING</p>
                        <div className={style.yellow}>
                            <i className={style.yellowStar}><GoStarFill size="1.5rem" /> </i>
                            <p>{key.rating}/10</p>
                        </div>
                    </div>
                    <div>
                        <p>YOUR RATING</p>
                        <div className={style.blue}>
                            <i className={style.blueStar}><CiStar  size="1.5rem" /> </i>
                            <p className={style.blueRate}>Rate</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.containerItem}>
                <img className={style.imgItem} src={key.path} alt="" />
                <iframe className={style.url} src={key.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>  
            </div>
            <div className={style.btnCategory} >
                {key.category.split(',').map((category, index) => (
                    <button className={style.btn} key={index}>{category.trim()}</button>
                ))}
            </div>
            <div>
                <p>{key.description.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>))}</p>
            </div>    
        </div>
            );
        }
    }
}
