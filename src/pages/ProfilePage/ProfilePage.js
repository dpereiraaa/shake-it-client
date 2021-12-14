import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log("user :>> ", user);

  return (
    <div>
      <p>{user && user.name}</p>
      <p>Favorite Cocktails:</p>
      {user &&
        user.favoriteDrinks.map((eachFavorite) => {
          return <p>{eachFavorite}</p>;
        })}
    </div>
  );
}

export default ProfilePage;
