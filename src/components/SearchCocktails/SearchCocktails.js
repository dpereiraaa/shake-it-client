import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="bg-red-50 h-screen pt-16">
      <div className="flex justify-center items-center space-x-5">
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder=" Search"
            value={searchTerm}
            onChange={handleSearchTerm}
            className=" w-64 h-8 border border-gray-400 focus:border-black"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 pl-44 pr-44 bg-red-50">
        {searchResults &&
          searchResults.map((oneCocktail) => {
            return (
              <Link
                key={oneCocktail.idDrink}
                to={"/details/" + oneCocktail.idDrink}
                onClick={clearOnClick}
              >
                <div className="flex items-center space-x-5 mr-5 mt-20 hover:shadow hover:bg-red-100">
                  <img
                    src={oneCocktail.strDrinkThumb}
                    width="150px"
                    className="rounded"
                    alt=""
                  ></img>
                  <span className="text-left">
                    <p className="text-lg font-extrabold">
                      {oneCocktail.strDrink}
                    </p>
                    <span>
                      <p>{oneCocktail.strCategory}</p>
                      <p>{oneCocktail.strAlcoholic}</p>
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default SearchCocktails;
