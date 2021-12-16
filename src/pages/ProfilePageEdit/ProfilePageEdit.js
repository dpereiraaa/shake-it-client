import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fileService from "../../services/file.service";

function ProfilePageEdit() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/api/users/current",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const eachUser = response.data;

        setEmail(eachUser.email);
        setName(eachUser.name);
        setImageUrl(eachUser.imageUrl);
      } catch (error) {
        setErrorMessage("Something went wrong");
      }
    };
    fetchData();
  }, []);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const requestBody = {
        email,
        name,
        imageUrl,
      };
      const authToken = localStorage.getItem("authToken");
      await axios.put(
        process.env.REACT_APP_SERVER_URL + "/api/users/current",
        requestBody,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      navigate("/profile");
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="bg-red-50 h-screen">
      <div className="flex justify-center bg-red-50 pt-16">
        <div className="shadow-red-400 p-10 border border-red-200 rounded-lg">
          <p className="font-semibold text-xl pb-5">Edit your profile:</p>
          <span>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center"
            >
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                className="h-8 border border-gray-400 focus:border-black mb-10 bg-white"
              />

              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmail}
                className="h-8 border border-gray-400 focus:border-black mb-10 bg-white"
              />
              <label>Profile Picture:</label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="mb-16"
              ></input>

              <button
                type="submit"
                className="p-2 bg-red-200 rounded-full hover:bg-red-400 mb-3"
              >
                Save Changes
              </button>
            </form>
          </span>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ProfilePageEdit;
