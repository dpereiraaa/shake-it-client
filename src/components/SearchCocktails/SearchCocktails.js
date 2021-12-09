import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

import { Link } from "react-router-dom";

const apiURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function SearchCocktails() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearOnClick = (e) => {
    setSearchTerm(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiURL + searchTerm);

      setSearchResults(response.data.drinks);
    };

    fetchData();
  }, [searchTerm]);

  if (searchTerm === "") {
    setSearchTerm(null);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
      <div>
        {searchResults &&
          searchResults.map((oneCocktail) => {
            return (
              <Link
                key={oneCocktail.idDrink}
                to={"/details/" + oneCocktail.idDrink}
                onClick={clearOnClick}
              >
                <div>
                  <img src={oneCocktail.strDrinkThumb} width="150px"></img>
                  <h1>{oneCocktail.strDrink}</h1>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default SearchCocktails;
