import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center w-screen h-15">
      <Link to="/">
        <div className="flex items-center">
          <img className="h-14" src="images/logo.png"></img>
          <p>Shake it!</p>
        </div>
      </Link>

      {isLoggedIn && (
        <div>
          {/* <div>
            <p>Random Cocktail</p>
            <p>By Ingridient</p>
            <p>What're people drinking?</p>
          </div> */}
          <div>
            <button onClick={logOutUser}>Logout</button>
            <div className="">
              {user && (
                <Link to="/profile">
                  <img
                    className="profile-img"
                    src={user.image}
                    alt="profile"
                    width="50px"
                  />
                  <p>{user.name}</p>
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
