import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      {isLoggedIn && (
        <div className="flex justify-between items-center h-auto">
          <div className="flex items-center">
            <div>
              <Link to="/">
                <span className="flex items-center">
                  <img className="h-14" src="images/logo.png"></img>
                  <p className="font-semibold text-xl">Shake it!</p>
                </span>
              </Link>
            </div>
            <div className="flex ml-8 space-x-6">
              <Link to="/random-cocktail">
                <p>Random Cocktail</p>
              </Link>
              <p>By Ingridient</p>
              <Link to="/all-posts">
                <p>What're people drinking?</p>
              </Link>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center">
              {user && (
                <Link to="/profile">
                  <img
                    className="profile-img"
                    src={user.image}
                    alt="profile"
                    width="50px"
                  />
                  <p>{user.name}</p>
                  <button onClick={logOutUser}>Logout</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <Link to="/signup">
            <button className="mr-1.5 border-2 border-black rounded p-1">
              Sign Up
            </button>
          </Link>

          <Link to="/login">
            <button className="ml-1.5 mr-5 border-2 border-black rounded p-1">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
