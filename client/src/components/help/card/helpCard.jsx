import { FaCircleInfo, FaCalendarDays } from "react-icons/fa6";
import { FiFilm } from "react-icons/fi";
import { LiaEye } from "react-icons/lia";
import { MdStar } from "react-icons/md";
import { AiFillTool } from "react-icons/ai";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { PiMedalFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import style from "./helpCard.module.css";


const icons = {
  circleInfo: () => <FaCircleInfo size="2rem" />,
  film: () => <FiFilm size="2rem" />,
  eye: () => <LiaEye size="2rem" />,
  star: () => <MdStar size="2rem" />,
  tool: () => <AiFillTool size="2rem" />,
  calendar: () => <FaCalendarDays size="2rem" />,
  phone: () => <MdOutlinePhoneIphone size="2rem" />,
  medal: () => <PiMedalFill size="2rem" />,
};


export function HelpCard() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4840/help", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className={style.cardContainer}>
      {info.map((data) => {
        return (
          <div key={data.category} className={style.card}>
            {data.icon ? icons?.[data?.icon]() : null}
            <p className={style.textThree}>{data.category}</p>
            <ul className={style.list}>
              {data.items.map((value, index) => (
                <li className={style.cardList} key={index}>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
