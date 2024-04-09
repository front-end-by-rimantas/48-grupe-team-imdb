/* eslint-disable no-empty-pattern */

import style from './MovieItems.module.css';
import movies from './data'
import { useParams } from 'react-router-dom';

export function MovieItemInner({ }) {
        const { id } = useParams();
        for(const key of movies){
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
                    </div>
                    <div>
                        <p>YOUR RATING</p>
                    </div>
                </div>
            </div>
            <div className={style.containerItem}>
                {/* <div> */}
                    <img className={style.imgItem} src={key.path} alt="" />
                {/* </div> */}
                {/* <div> */}
                    <iframe className={style.url} src={key.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>  
                {/* </div>   */}
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
