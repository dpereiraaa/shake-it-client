import { useState, useEffect } from "react";
import axios from "axios";

const apiURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

function RandomCocktails() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get(apiURL);
      const response2 = await axios.get(apiURL);
      const response3 = await axios.get(apiURL);
      const response4 = await axios.get(apiURL);
      const response5 = await axios.get(apiURL);
      const response6 = await axios.get(apiURL);
      const response7 = await axios.get(apiURL);
      const response8 = await axios.get(apiURL);
      const response9 = await axios.get(apiURL);
      const response10 = await axios.get(apiURL);

      const tenResponses = [];

      tenResponses.push(
        response1.data.drinks,
        response2.data.drinks,
        response3.data.drinks,
        response4.data.drinks,
        response5.data.drinks,
        response6.data.drinks,
        response7.data.drinks,
        response8.data.drinks,
        response9.data.drinks,
        response10.data.drinks
      );

      setCocktails(tenResponses);
    };

    fetchData();
  }, []);

  return (
    <div>
      {cocktails.map((oneCocktail) => {
        console.log("oneCocktail", oneCocktail);
        return (
          <div>
            <p>{oneCocktail[0].strDrink}</p>
            <img src={oneCocktail[0].strDrinkThumb} width="150px"></img>
          </div>
        );
      })}
    </div>
  );
}

export default RandomCocktails;
