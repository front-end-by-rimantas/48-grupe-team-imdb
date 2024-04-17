import style from "./Jobs.module.css";

export function Jobs() {
  return (
    <div className={style.page}>
      <main>
        <div className={style.heroContainer}>
          <div className={style.imgContainer}>
            <img
              className={style.heroImage}
              src="http://localhost:4840/assets/images/jobsimg/hero.webp"
              alt="heroImage"
            />
          </div>
          <div className={style.heroBox}>
            <div className={style.heroContent}>
              <div className={style.content}>
                <img
                  className={style.logoImg}
                  src="http://localhost:4840/assets/images/jobsimg/imdblogo.png"
                  alt="heroImage"
                />
                <div>
                  <label className={style.label}>0 OPEN JOBS</label>
                </div>
                <h1 className={style.title}>IMDb</h1>
                <div>
                  <p className={style.titleP}>
                    IMDb runs the #1 movie & TV website in the world with a
                    combined web and mobile audience of more than 250 million
                    unique monthly visitors. IMDb sits at the intersection of
                    entertainment, media, and technology inside the world’s most
                    innovative and customer-centric company—Amazon. IMDb
                    employees enjoy the benefits of working for Amazon with the
                    autonomy of working on a small, nimble team. View our open
                    roles and come join our cast!
                  </p>
                </div>
                <div>
                  <button className={style.btn}>View open roles</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section>
        
      </section>
    </div>
  );
}
