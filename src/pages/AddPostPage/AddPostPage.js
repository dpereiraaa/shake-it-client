import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fileService from "../../services/file.service";

function AddPostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handlePostSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { title, description, image: imageUrl };

      const authToken = localStorage.getItem("authToken");
      await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/create-post",
        requestBody,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      navigate("/all-posts");
    } catch (error) {
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
          <p className="font-semibold text-xl pb-5">Add a Post:</p>
          <span>
            <form
              onSubmit={handlePostSubmit}
              className="flex flex-col justify-center"
            >
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleTitle}
                className="h-8 border border-gray-400 focus:border-black mb-10 bg-white"
              />

              <label>Description:</label>
              <input
                type="description"
                name="description"
                value={description}
                onChange={handleDescription}
                className="h-8 border border-gray-400 focus:border-black mb-10 bg-white"
              />

              <input
                type="file"
                onChange={handleFileUpload}
                className="mb-16"
              ></input>

              <button
                type="submit"
                className="p-2 bg-red-200 rounded-full hover:bg-red-400"
              >
                Post!
              </button>
            </form>
          </span>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddPostPage;
