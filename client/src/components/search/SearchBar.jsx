import style from "./SearchBar.module.css";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import movies from "./data.json";

export function SearchBar() {
                          //SearchBar(setResults) 
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]); 
  const [wrongSearchText, setWrongText] = useState('');

  // const fetchData = (result) => {
  //   
  // };
  
  // const handleChange = (event) => {
   // setSearchText(event.target.value);
  //  const searchWord = event.target.value.toLowerCase()
  //  fetch("http://localhost:4840/api/movies")  ????? REIKIA PAKLAUSTI ??????
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const results = data.filter((movies) => {
  //         return (
  //         movies.name.toLowerCase().includes(searchWord));
  //       });
  //         setFilteredData(results);
  //       });
  //     .catch(e => console.error(e));
  // };

  function handleFilter(event) {                  //koly bude fetch prybraty
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
    <div className={style.serchPage}>
      <div className={style.searchForma}>
        <input
          placeholder="Search IMdb."
          type="text"
          className={style.searchInput}
          value={searchText}
          onChange={handleFilter}  //zaminyty na {handleChange}
        />
        <div className={style.searchIconele}>
          <button
            className={style.buttonSearch}
            type="submit"
            onClick={handleFormSubmit}>
          {filteredData.length === 0 ? (
            <IoIosSearch />
          ) : (
            <IoIosClose  id="clearBtn" 
            onClick={clearInput} />
          )}
        </button>
      </div>
      {filteredData.length != 0 && (
        <div className={style.searchResult}>
          {filteredData.map((value, key) => {
            return (
              <a className={style.searchItem} href={`/${value.href}`} key={key} target="_blank">
                {/* <a className={style.dataItem} href={value.href} key={key} target="_blank"></a> */}
                  <img className={style.imgItemSearch} src={value.path} alt="" />
                  <div className={style.searchSection}>
                    <span className={style.nameLink}>{value.name}</span> 
                    <span className={style.awardsLink}>{value.awards}</span> 
                  </div>
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