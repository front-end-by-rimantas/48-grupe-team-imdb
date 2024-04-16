import style from "./Jobs.module.css";

export function Jobs() {
  return (
    <div className={style.page}>
      <main>
        <div className={style.heroContainer}>
          <div className={style.imgContainer}>
            <img className={style.heroImage} src="http://localhost:4840/assets/images/jobsimg/hero.webp" alt="heroImage"/>
          </div>
          <div className={style.heroBox}>
            <div className={style.heroContent}>
              <h1>CONTENT</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
