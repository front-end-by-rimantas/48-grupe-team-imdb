import style from "./Help.module.css";

export function Help() {
  return (
    <div>
      <section className={style.container}>
        <div className={style.helpArea}>
          <div className={style.title}>
            <img src={"http://localhost:4840/assets/images/whitelogo.png"} className={style.whiteLogo}/>
            <h2 className={style.text}>Help Center</h2>
          </div>
        </div>
      </section>
      <section></section>
      <section></section>
    </div>
  );
}
