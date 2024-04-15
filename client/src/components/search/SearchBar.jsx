import style from "./SearchBar.module.css";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

export function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [wrongSearchText, setWrongText] = useState("");

  const onSearchInput = async (event) => {
    setSearchText(event.target.value);

    const searchWord = event.target.value.toLowerCase();

    if (searchWord.length) {
      fetch(`http://localhost:4840/movies/search?name=${searchWord}`)
        .then((res) => res.json())
        .then((data) => {
          setFilteredData(data);
        })
        .catch((e) => console.error(e));
    } else {
      setFilteredData([]);
    }
  };

  function onFormSubmit(e) {
    e.preventDefault();

    if (!searchText.length) {
      setWrongText("Enter at least one character");
    } else {
      setWrongText("");
    }
  }

  const onClearInput = () => {
    setFilteredData([]);
    setSearchText("");
  };

  return (
    <div className={style.serchPage}>
      <div className={style.searchForma}>
        <input
          placeholder="Search IMdb."
          type="text"
          className={style.searchInput}
          value={searchText}
          onChange={onSearchInput}
        />
        <div className={style.searchIcon}>
          <button
            className={style.buttonSearch}
            type="submit"
            onClick={onFormSubmit}
          >
            {filteredData.length === 0 ? (
              <IoIosSearch />
            ) : (
              <IoIosClose id="clearBtn" onClick={onClearInput} />
            )}
          </button>
        </div>
        {filteredData.length && searchText.length ? (
          <div className={style.searchResult}>
            {filteredData.map((value, key) => {
              return (
                <a
                  className={style.searchItem}
                  href={`/${value.href}`}
                  key={key}
                  target="_blank"
                >
                  {/* <a className={style.dataItem} href={value.href} key={key} target="_blank"></a> */}
                  <img
                    className={style.imgItemSearch}
                    src={value.path}
                    alt=""
                  />
                  <div className={style.searchSection}>
                    <span className={style.nameLink}>{value.name}</span>
                    <span className={style.awardsLink}>{value.awards}</span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
      {wrongSearchText === "" ? null : (
        <p className={style.error}>{wrongSearchText}</p>
      )}
    </div>
  );
}
