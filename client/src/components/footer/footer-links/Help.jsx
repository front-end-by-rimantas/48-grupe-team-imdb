import style from "./Help.module.css";

export function Help() {
  return (
    <div>
      <section className={style.container}>
        <div className={style.helpArea}>
          <div className={style.title}>
            <img
              src={"http://localhost:4840/assets/images/whitelogo.png"}
              className={style.whiteLogo}
            />
            <h2 className={style.text}>Help Center</h2>
          </div>
        </div>
      </section>
      <section className={style.containerTwo}>
        <div>
          <div>
            <img src={"http://localhost:4840/assets/images/prologo.png"} />
            <h4>For industry professionals</h4>
            <p>Make the most of your Pro membership benefits</p>
          </div>
          <div>
            <img src={"http://localhost:4840/assets/images/prologo.png"} />
            <h4>For entertainment fans</h4>
            <p>Learn how to discover what to watch</p>
          </div>
          <div>
            <img
              src={"http://localhost:4840/assets/images/contributorslogo.png"}
            />
            <h4>For contributors</h4>
            <p>Learn about contributing & updating data</p>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
}
