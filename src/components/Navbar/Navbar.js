import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center w-screen h-15 bg-red-50">
      <Link to="/">
        <img className="h-14" src="images/logo.png"></img>
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}

      <div className="">
        {user && (
          <Link to="/profile">
            <img className="profile-img" src={user.image} alt="profile" />
            <p>{user.name}</p>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
