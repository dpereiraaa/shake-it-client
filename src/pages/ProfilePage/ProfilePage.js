import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

const apiURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [userFavorites, setUserFavorites] = useState(null);
  const [userFavoritesNewArr, setUserFavoritesNewArr] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

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
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        "http://localhost:5005/api/users/current",
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setUserPosts(response.data.user_posts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userFavorites) {
        const pendingPrs = userFavorites.map((drinkId) => {
          return axios.get(apiURL + drinkId);
        });
        const drinksResponses = await Promise.all(pendingPrs);

        const drinks = drinksResponses.map((eachResponse) => {
          return eachResponse.data.drinks[0];
        });
        setUserFavoritesNewArr(drinks);
      }
    };
    fetchData();
  }, [userFavorites]);

  return (
    <div className="flex justify-center bg-red-50 h-full pt-16 pb-36">
      <div className="w-3/4 h-full">
        <span className="flex justify-center items-center mt-12 mb-12 ml-6 space-x-7">
          <img
            src={user && user.image}
            className="rounded-full w-16 h-16 md:w-24 md:h-24"
            alt=""
          ></img>
          <p className="font-bold text-xl md:text-5xl">{user && user.name}</p>
        </span>
        <span>
          <p className=" flex justify-center font-bold text-2xl mb-10 ml-6">
            Favorite Cocktails:
          </p>
          <span className="grid grid-cols-2 md:grid-cols-3">
            {userFavoritesNewArr &&
              userFavoritesNewArr.map((eachFavorite) => {
                return (
                  <Link
                    key={eachFavorite.idDrink}
                    to={"/details/" + eachFavorite.idDrink}
                  >
                    <div className="flex flex-col items-center mb-5  space-y-2">
                      <img
                        src={eachFavorite.strDrinkThumb}
                        className="rounded-lg shadow hover:shadow-xl hover:opacity-80 w-2/4 md:w-2/5"
                        alt=""
                      ></img>
                      <p>{eachFavorite.strDrink}</p>
                    </div>
                  </Link>
                );
              })}
          </span>
          <p className=" flex justify-center font-bold text-2xl mt-10 mb-10 ml-6">
            Posts:
          </p>
          <span className="grid grid-cols-2 md:grid-cols-3">
            {userPosts &&
              userPosts.map((eachPost) => {
                return (
                  <Link key={eachPost._id} to={"/all-posts"}>
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={eachPost.image}
                        className="rounded-lg shadow hover:shadow-xl hover:opacity-80  w-2/4 md:w-2/5"
                        alt=""
                      ></img>
                      <p>{eachPost.title}</p>
                    </div>
                  </Link>
                );
              })}
          </span>
        </span>
      </div>
    </div>
  );
}

export default ProfilePage;
