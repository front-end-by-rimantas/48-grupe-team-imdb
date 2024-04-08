import style from './MovieItems.module.css';

export function MovieList() {
    return (
        <div className={style.container}>
            <div className={style.item}>
                <div className={style.title}>Movie List</div>
                <div className={style.year}>Year</div>
            </div>
        </div>
    );

}