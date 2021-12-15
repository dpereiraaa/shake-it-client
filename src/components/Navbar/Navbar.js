import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      {isLoggedIn && (
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div>
              <Link to="/">
                <span className="flex items-center -space-x-3">
                  <img className="h-14" src="images/logo.png"></img>
                  <p className="font-semibold text-xl">Shake it!</p>
                </span>
              </Link>
            </div>
            <div className="flex ml-8 space-x-6">
              <Link to="/byCocktails" className="hover:text-gray-500">
                <p>By Cocktails</p>
              </Link>
              <Link to="/byIngridients" className="hover:text-gray-500">
                <p>By Ingridients</p>
              </Link>
              <Link to="/random-cocktail" className="hover:text-gray-500">
                <p>Random Cocktail</p>
              </Link>
              <Link to="/all-posts" className="hover:text-gray-500">
                <p>What're people drinking?</p>
              </Link>
            </div>
          </div>
          <div>
            <div className="mr-5">
              {user && (
                <Link
                  to="/profile"
                  className="flex items-center rounded-full space-x-4 hover:opacity-80"
                >
                  <span>
                    <p className="font-semibold">{user.name}</p>
                    <button onClick={logOutUser}>Logout</button>
                  </span>
                  <span>
                    <img
                      className="rounded-full w-11 h-11"
                      src={user.image}
                      alt="profile"
                    />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="flex justify-between items-center h-auto mt-2">
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
        </div>
      )}
    </nav>
  );
}

export default Navbar;
