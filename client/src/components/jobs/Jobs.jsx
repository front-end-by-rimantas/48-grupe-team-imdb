import { useEffect } from "react";
import style from "./Jobs.module.css";

export function Jobs() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className={style.page}>
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
      </section>
      <section className={style.whitePage}>
        <div className={style.voiceContainer}>
          <div className={style.mainContainer}>
            <div className={style.voiceTitle}>
              <h2 className={style.hTitle}>Voices of IMDb</h2>
            </div>
            <div className={style.voiceList}>
              <div className={style.commentsList}>
                <div className={style.cardRoot}>
                  <div className={style.cardMedia}>
                    <img
                      className={style.cardImg}
                      src="http://localhost:4840/assets/images/jobsimg/1.webp"
                      alt="mainImage"
                    />
                  </div>
                </div>
                <div className={style.cardBody}>
                  <p className={style.cardP}>
                    I work on the Events team at IMDb as a Senior Event
                    Producer. This means I manage cross-team programs for a
                    number of events, including Sundance Film Festival, South by
                    Southwest, and San Diego Comic-Con, as well as sponsorships
                    of events, including the American Black Film Festival and
                    Independent Spirit Awards. These events include
                    on-the-ground programs and digital programs across IMDb.com.
                  </p>
                  <p className={style.cardP}>
                    My work prior to IMDb was solely with a small agency, so I
                    was blown away with the resources that became available to
                    me once I started working for a company like Amazon. Working
                    at IMDb allows me to have a close connection within the
                    Amazon network with like-minded and movie-obsessed
                    coworkers.”
                  </p>
                  <cite className={style.cardCite}>
                    <strong>Maddiev</strong>
                    <p className={style.bottomP}>Senior Event Producer</p>
                  </cite>
                </div>
              </div>
              <div className={style.commentsList}>
                <div className={style.cardRoot}>
                  <div className={style.cardMedia}>
                    <img
                      className={style.cardImg}
                      src="http://localhost:4840/assets/images/jobsimg/2.webp"
                      alt="mainImage2"
                    />
                  </div>
                </div>
                <div className={style.cardBody}>
                  <p className={style.cardP}>
                    I work on the Originals team at IMDb as a Video Producer. I
                    write, produce, and program original and social content for
                    the biggest shows, movies, and festivals, including
                    Sundance, the American Black Film Festival, and San Diego
                    Comic-Con. This includes interviewing A-list and trending
                    celebrities. This programming is featured on IMDb’s social
                    accounts and IMDb.com. Prior to IMDb, I worked in daytime
                    television as a producer and booker.
                  </p>
                  <p className={style.cardP}>
                    I love how the IMDb team is truly movie, TV, and
                    customer-obsessed. I feel inspired by my peers and the
                    resources available at Amazon to challenge how we ideate and
                    create content that impacts multiple age demographics,
                    communities, and all movie and TV lovers.”
                  </p>
                  <cite className={style.cardCite}>
                    <strong>Tre</strong>
                    <p className={style.bottomP}>Video Producer</p>
                  </cite>
                </div>
              </div>
              <div className={style.commentsList}>
                <div className={style.cardRoot}>
                  <div className={style.cardMedia}>
                    <img
                      className={style.cardImg}
                      src="http://localhost:4840/assets/images/jobsimg/3.webp"
                      alt="mainImage3"
                    />
                  </div>
                </div>
                <div className={style.cardBody}>
                  <p className={style.cardP}>
                    I’m a movie lover at heart, so getting the job at IMDb was a
                    dream turned reality. As an Event Producer, I’m responsible
                    for building, executing, and scaling cross-functional
                    programs, events, and sponsorship campaigns from concept to
                    completion. I’m able to work backwards from a customer’s
                    goal and provide measurable results.
                  </p>
                  <p className={style.cardP}>
                    I love being an IMDb/Amazon employee because I’m able to
                    constantly learn skills from those around me. I’m encouraged
                    by my manager and coworkers to think big, take risks, and
                    innovate. I’m surrounded by people who are passionate about
                    the work they do and have a great time doing it.”
                  </p>
                  <cite className={style.cardCite}>
                    <strong>Myra</strong>
                    <p className={style.bottomP}>Event Producer</p>
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={style.thirdSection}>
        <div className={style.thirdContainer}>
            <div className={style.bottomText}>
              <h2 className={style.bottomH}>Working at IMDb</h2>
              <p className={style.bottomPara}>
                Hear from our employees about why they love working at IMDb.
              </p>
            </div>
            <div className={style.videoBox}>
              <iframe
                className={style.video}
                src="https://www.youtube.com/embed/MhFxMI_ujVk"
                title="Join us at IMDb: The world’s most popular &amp; authoritative source for movies, shows, &amp; entertainment"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullscreen
              ></iframe>
            </div>
        </div>
      </section>
    </div>
  );
}
