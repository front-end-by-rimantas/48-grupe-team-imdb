/* eslint-disable no-empty-pattern */

import style from './MovieItems.module.css';
import movies from './data'
import { useParams } from 'react-router-dom';

export function MovieItemInner({ }) {
        const { id } = useParams();
        for(const key of movies){
            if(key.href === id){

        return (
            <div>
                <div>
                    <h1>{key.name}</h1>
                </div>
                <div className={style.containerItem}>
                    <div>
                        <img className={style.imgItem} src={key.path} alt="" />
                    </div>
                    <div>
                        <iframe className={style.url} src={key.url} title="YouTube video player" 
                        frameBorder="0" allowFullScreen></iframe>    
                    </div>
                </div>
                <div className={style.btnCategory} >
                {key.category.split(',').map((category, index) => (
                    <button key={index}>{category.trim()}</button>
                ))}
                </div>
                <div>
                    <p>{key.description}</p>
                </div>
            </div>
            );
        }
    }
}
