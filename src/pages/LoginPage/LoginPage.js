// src/pages/LoginPage.js

import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

import authService from "../../services/auth.service";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Get the function for saving and verifying the token
  const { logInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = { email, password };

      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5005/auth/login",
        requestBody,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      // or with a service
      // const response = await authService.login(requestBody);

      // Save the token and set the user as logged in ...
      const token = response.data.authToken;
      logInUser(token);

      navigate("/");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="bg-red-50 h-screen">
      <div className="flex justify-center bg-red-50 pt-16">
        <div className="shadow-red-400 p-16 border border-red-200 rounded-lg">
          <p className="font-semibold text-xl pb-5">Login</p>
          <span>
            <form
              onSubmit={handleLoginSubmit}
              className="flex flex-col justify-center"
            >
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
                className="h-8 border border-gray-400 focus:border-black mb-10 bg-white"
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                className="h-8 border border-gray-400 focus:border-black mb-10 bg-white"
              />

              <button
                type="submit"
                className="p-2 bg-red-200 rounded-full hover:bg-red-400 mb-3 "
              >
                Login
              </button>
              <p className="font-extralight text-sm mb-4">
                Don't have an account yet?
              </p>
              <Link
                to={"/signup"}
                className="p-1 bg-red-200 rounded-full hover:bg-red-400 text-sm"
              >
                {" "}
                Sign Up
              </Link>
            </form>
          </span>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
