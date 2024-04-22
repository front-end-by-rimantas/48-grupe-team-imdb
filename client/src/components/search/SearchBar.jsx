import style from "./SearchBar.module.css";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
 
export function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Enter at least one character");
    } else {
      setErrorMessage("");
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
          placeholder="Search IMDb."
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
                <Link
                  className={style.searchItem}
                  to={`/movies/get/${value.href}`}
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
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
      {errorMessage === "" ? null : (
        <p className={style.error}>{errorMessage}</p>
      )}
    </div>
  );
}
