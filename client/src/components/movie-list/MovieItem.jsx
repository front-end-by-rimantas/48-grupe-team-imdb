import style from './MovieItems.module.css';

export function MovieItem() {
    return (
        <div className={style.container}>
            <div className={style.item}>
                <div className={style.title}>Movie Title</div>
                <div className={style.year}>Year</div>
            </div>
        </div>
    );

}
