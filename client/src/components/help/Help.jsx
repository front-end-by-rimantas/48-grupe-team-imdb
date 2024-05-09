import { useEffect } from "react";
import style from "./Help.module.css";
import { HelpCard } from "./card/helpCard";

export function Help() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <section className={`${style.containerTwo} ${style.containerSize}`}>
        <div className={style.box}>
          <img
            src={"http://localhost:4840/assets/images/prologo.png"}
            className={style.img}
          />
          <p className={style.textTwo}>For industry professionals</p>
          <h4 className={style.textThree}>
            Make the most of your Pro membership benefits
          </h4>
        </div>
        <div className={style.box}>
          <img
            src={"http://localhost:4840/assets/images/imdblogo.png"}
            className={style.img}
          />
          <p className={style.textTwo}>For entertainment fans</p>
          <h4 className={style.textThree}>
            Learn how to discover what to watch
          </h4>
        </div>
        <div className={style.box}>
          <img
            src={"http://localhost:4840/assets/images/contributorslogo.png"}
            className={style.img}
          />
          <p className={style.textTwo}>For contributors</p>
          <h4 className={style.textThree}>
            Learn about contributing & updating data
          </h4>
        </div>
      </section>
      <section className={`${style.containerThree} ${style.containerSize}`}>
        <HelpCard />
      </section>
      <section className={style.borderContainer}>
        <div className={style.containerFour}>
          <div className={style.endText}>
            <h2 className={style.endTitle}>IMDb general support</h2>
            <h5 className={style.endSecondTitle}>
              Our support community is always around to help
            </h5>
            <ul className={style.allList}>
              <li className={style.endList}>
                Need more help? Visit the official IMDb support community
                powered by Sprinklr.
              </li>
              <li className={style.endList}>
                How do I report illegal content or ads?
              </li>
              <li className={style.endList}>
                Issues logging in to IMDb? Get login help.
              </li>
            </ul>
            <p className={style.endParagraph}>
              Industry professional, not a member yet? Join IMDbPro.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
