import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

const apiURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [userFavorites, setUserFavorites] = useState(null);
  const [userFavoritesNewArr, setUserFavoritesNewArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        "http://localhost:5005/api/users/current",
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setUserFavorites(response.data.favorite_drinks);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userFavorites) {
        console.log("userFavorites :>> ", userFavorites);
        for (let i = 0; i < userFavorites.length; i++) {
          let responseObj = await axios.get(apiURL + userFavorites);
          userFavoritesNewArr.push(responseObj);
          console.log("newarray :>> ", userFavoritesNewArr);
        }
      }
    };
    fetchData();
  }, [userFavorites, userFavoritesNewArr]);

  return (
    <div>
      <p>{user && user.name}</p>
      <p>Favorite Cocktails:</p>
      {userFavorites &&
        userFavorites.map((eachFavorite) => {
          return <p>{eachFavorite}</p>;
        })}
    </div>
  );
}

export default ProfilePage;
