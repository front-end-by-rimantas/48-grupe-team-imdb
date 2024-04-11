import style from "./SearchBar.module.css";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import movies from "./data.json";

export function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]); 
  const [wrongSearchText, setWrongText] = useState('');

  function handleFilter(event) {
    const searchWord = event.target.value.toLowerCase();
    const newFilter = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchWord)
    );
    setSearchText(event.target.value);
    setFilteredData(newFilter);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!searchText.length) {
      setWrongText('Enter at least one character');
    } else {
      setWrongText('');
    }

    console.log( searchText, filteredData );
  }
  const clearInput = () => {
    setFilteredData([]);
    setSearchText("");
  };


  return (
    <div className={style.formList}>
      <div className={style.searchForm}>
        <input
          placeholder="Search IMdb."
          type="text"
          className={style.search}
          value={searchText}
          onChange={handleFilter}
        />
        <div className={style.searchIcon}>
          <button
            className={style.btnSearch}
            type="submit"
            onClick={handleFormSubmit}
          >
          {filteredData.length === 0 ? (
            <IoIosSearch />
          ) : (
            <IoIosClose  id="clearBtn" onClick={clearInput} />
          )}
        </button>
      </div>
      {filteredData.length != 0 && (
        <div className={style.dataResult}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className={style.dataItem} href={value.href} key={key}target="_blank">
                <p className={style.nameLink}>{value.name} </p>
              </a>
            );
          })}
        </div>
      )}
      </div>
      {wrongSearchText === '' ? null : (
        <p className={style.error}>{wrongSearchText}</p>
      )}
    </div>
  );
}