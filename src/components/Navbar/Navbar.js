import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="bg-red-50">
      {isLoggedIn && (
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div>
              <Link to="/">
                <span className="flex items-center -space-x-3">
                  <img className="h-14" src="images/logo.png"></img>
                  <p className="font-semibold text-lg sm:text-xl">Shake it!</p>
                </span>
              </Link>
            </div>
            <div className="flex ml-8 space-x-3 sm:space-x-6 items-center ">
              <Link
                to="/byCocktails"
                className="text-sm sm:text-base hover:text-gray-500"
              >
                <p>By Cocktails</p>
              </Link>
              <Link
                to="/byIngridients"
                className="text-sm sm:text-base hover:text-gray-500"
              >
                <p>By Ingridients</p>
              </Link>
              <Link
                to="/random-cocktail"
                className="text-sm sm:text-base hover:text-gray-500"
              >
                <p>Random Cocktail</p>
              </Link>
              <Link
                to="/all-posts"
                className="text-sm sm:text-base hover:text-gray-500"
              >
                <p>What're people drinking?</p>
              </Link>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <span className="flex items-center">
                <Link to="/add-post" className="pr-1">
                  <img
                    src="/images/add-button.png"
                    className="w-3/5 hover:opacity-80 invisible sm:visible"
                    alt=""
                  ></img>
                </Link>
              </span>
              {user && (
                <>
                  <span className="flex items-center">
                    <Link
                      to="/profile"
                      className="flex items-center rounded-full space-x-4 hover:opacity-80"
                    >
                      <p className="invisible sm:visible font-semibold">
                        {user.name}
                      </p>

                      <img
                        className="rounded-full w-11 h-11"
                        src={user.image}
                        alt="profile"
                      />
                    </Link>
                  </span>
                  <span className="pl-4 flex items-center">
                    <button onClick={logOutUser}>
                      <img
                        src="/images/logout.png"
                        className="w-3/6 hover:opacity-80"
                        alt=""
                      ></img>
                    </button>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div>
              <Link to="/">
                <span className="flex items-center -space-x-3">
                  <img className="h-14" src="images/logo.png"></img>
                  <p className="font-semibold text-lg sm:text-xl">Shake it!</p>
                </span>
              </Link>
            </div>
            <div className="flex ml-8 space-x-3 sm:space-x-6 items-center ">
              <Link
                to="/byCocktails"
                className="text-sm sm:text-base hover:text-gray-500"
              >
                <p>By Cocktails</p>
              </Link>
              <Link
                to="/byIngridients"
                className="text-sm sm:text-base hover:text-gray-500"
              >
                <p>By Ingridients</p>
              </Link>
              <Link
                to="/random-cocktail"
                className="text-sm sm:text-base hover:text-gray-500"
              >
                <p>Random Cocktail</p>
              </Link>
              <Link
                to="/all-posts"
                className="text-sm sm:text-base hover:text-gray-500"
              >
                <p>What're people drinking?</p>
              </Link>
            </div>
          </div>
          <div className="space-x-2">
            <Link to="/signup">
              <button className="pr-1.5 border-2 border-black rounded p-1 hover:bg-white">
                Sign Up
              </button>
            </Link>

            <Link to="/login">
              <button className="pl-1.5 pr-1.5 mr-10 border-2 border-black rounded p-1 hover:bg-white">
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
