import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const apiURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function CocktailDetailsPage() {
  const [cocktail, setCocktail] = useState(null);
  const { cocktailId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiURL + cocktailId);

      setCocktail(response.data.drinks);
    };

    fetchData();
  }, [cocktailId]);
  console.log("cocktail :>> ", cocktail);

  return (
    <div>
      <div>
        <img src={cocktail && cocktail[0].strDrinkThumb} width="150px"></img>
        <span>
          <h1>{cocktail && cocktail[0].strDrink}</h1>
          <ul>
            <p>{cocktail && cocktail[0].strIngredient1}</p>
            <p>{cocktail && cocktail[0].strIngredient2}</p>
            <p>{cocktail && cocktail[0].strIngredient3}</p>
            <p>{cocktail && cocktail[0].strIngredient4}</p>
            <p>{cocktail && cocktail[0].strIngredient5}</p>
            <p>{cocktail && cocktail[0].strIngredient6}</p>
            <p>{cocktail && cocktail[0].strIngredient7}</p>
            <p>{cocktail && cocktail[0].strIngredient8}</p>
            <p>{cocktail && cocktail[0].strIngredient9}</p>
            <p>{cocktail && cocktail[0].strIngredient10}</p>
            <p>{cocktail && cocktail[0].strIngredient11}</p>
            <p>{cocktail && cocktail[0].strIngredient12}</p>
            <p>{cocktail && cocktail[0].strIngredient13}</p>
            <p>{cocktail && cocktail[0].strIngredient14}</p>
            <p>{cocktail && cocktail[0].strIngredient15}</p>
          </ul>
        </span>
      </div>
      <span>
        <h3>Preparation:</h3>
        <p>{cocktail && cocktail[0].strInstructions}</p>
      </span>
    </div>
  );
}

export default CocktailDetailsPage;
