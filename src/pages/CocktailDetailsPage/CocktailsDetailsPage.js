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
  const { setUser } = useContext(AuthContext);

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
    <div className="bg-red-50 h-screen pt-16">
      <div className="flex justify-center">
        <div className="w-2/3 flex justify-center items-center border">
          <span className="p-10">
            <img
              src={cocktail && cocktail[0].strDrinkThumb}
              className="border rounded max-w-xs"
              alt=""
            ></img>
          </span>
          <span className="p-10 flex flex-col text-left">
            <span className="flex flex-col content-between">
              <span className="pb-16 flex items-center justify-between">
                <h1 className="text-5xl font-semibold underline">
                  {cocktail && cocktail[0].strDrink}
                </h1>
                <form
                  onSubmit={(e) => handleFavoriteDrink(e, cocktail[0].idDrink)}
                >
                  <button
                    type="submit"
                    name="favorite_drinks"
                    value={favorite_drinks}
                    onChange={handleFavoriteDrinkChange}
                  >
                    Favorite
                  </button>
                </form>
              </span>
              <span className="pb-10">
                <p className="font-semibold">Ingridients:</p>
                <ul className="pl-1">
                  <li>{cocktail && cocktail[0].strIngredient1} </li>
                  <li>{cocktail && cocktail[0].strIngredient2}</li>
                  <li>{cocktail && cocktail[0].strIngredient3}</li>
                  <li>{cocktail && cocktail[0].strIngredient4}</li>
                  <li>{cocktail && cocktail[0].strIngredient5}</li>
                  <li>{cocktail && cocktail[0].strIngredient6}</li>
                  <li>{cocktail && cocktail[0].strIngredient7}</li>
                  <li>{cocktail && cocktail[0].strIngredient8}</li>
                  <li>{cocktail && cocktail[0].strIngredient9}</li>
                  <li>{cocktail && cocktail[0].strIngredient10}</li>
                  <li>{cocktail && cocktail[0].strIngredient11}</li>
                  <li>{cocktail && cocktail[0].strIngredient12}</li>
                  <li>{cocktail && cocktail[0].strIngredient13}</li>
                  <li>{cocktail && cocktail[0].strIngredient14}</li>
                  <li>{cocktail && cocktail[0].strIngredient15}</li>
                </ul>
              </span>
              <span className="pb-5">
                <h3 className="font-semibold">Preparation:</h3>
                <p>{cocktail && cocktail[0].strInstructions}</p>
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CocktailDetailsPage;
