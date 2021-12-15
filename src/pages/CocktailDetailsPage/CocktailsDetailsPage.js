import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const apiURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function CocktailDetailsPage() {
  const [cocktail, setCocktail] = useState(null);
  const [favorite_drinks, setFavorite_drinks] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { cocktailId } = useParams();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiURL + cocktailId);

      setCocktail(response.data.drinks);
    };

    fetchData();
  }, [cocktailId]);

  const handleFavoriteDrinkChange = (e) => setFavorite_drinks(e.target.value);

  const handleFavoriteDrink = async (e, cocktailId) => {
    e.preventDefault();
    try {
      const requestBody = { favorite_drinks: cocktailId };

      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:5005/api/users/current",
        requestBody,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setFavorite_drinks(true);
      setUser(response.data);
      console.log("response.data :>> ", response.data);
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div>
      <div className="m-10 flex justify-center">
        <img
          src={cocktail && cocktail[0].strDrinkThumb}
          width="150px"
          className="border rounded-xl"
          alt=""
        ></img>
        <span className="ml-10 flex flex-col justify-center">
          <h1 className="text-5xl">{cocktail && cocktail[0].strDrink}</h1>
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
      <form onSubmit={(e) => handleFavoriteDrink(e, cocktail[0].idDrink)}>
        <button
          type="submit"
          name="favorite_drinks"
          value={favorite_drinks}
          onChange={handleFavoriteDrinkChange}
        >
          Add to Favorites
        </button>
      </form>
    </div>
  );
}

export default CocktailDetailsPage;
