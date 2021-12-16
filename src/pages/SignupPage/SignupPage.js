import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";
import fileService from "../../services/file.service";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { email, password, name, image: imageUrl };

      const authToken = localStorage.getItem("authToken");
      await axios.post("http://localhost:5005/auth/signup", requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // or with a service
      // await authService.signup(requestBody);

      // If the request is successful navigate to login page
      navigate("/login");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]);

      const response = await fileService.uploadImage(uploadData);

      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to upload image");
    }
  };

  return (
    <div className="bg-red-50 h-screen">
      <div className="flex justify-center bg-red-50 pt-16">
        <div className="shadow-red-400 p-10 border border-red-200 rounded-lg">
          <p className="font-semibold text-xl pb-5">Sign up:</p>
          <span>
            <form
              onSubmit={handleSignupSubmit}
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
                name="description"
                value={password}
                onChange={handlePassword}
                className="h-8 border border-gray-400 focus:border-black mb-10 bg-white"
              />

              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                className="h-8 border border-gray-400 focus:border-black mb-10 bg-white"
              />

              <input
                type="file"
                onChange={handleFileUpload}
                className="mb-16"
              ></input>

              <button
                type="submit"
                className="p-2 bg-red-200 rounded-full hover:bg-red-400 mb-3"
              >
                Create account
              </button>

              <p className="font-extralight text-sm mb-4">
                Already have account?
              </p>
              <Link
                to={"/login"}
                className="p-1 bg-red-200 rounded-full hover:bg-red-400 text-sm"
              >
                {" "}
                Login
              </Link>
            </form>
          </span>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignupPage;
