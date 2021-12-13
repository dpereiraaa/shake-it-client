import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import fileService from "../../services/file.service";

function AddPostPage(props) {
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
      await axios.post("http://localhost:5005/api/create-post", requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      //   navigate("/login");
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
    <div className="AddPostPage">
      <h1>Sign Up</h1>

      <form onSubmit={handlePostSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />

        <label>Description:</label>
        <input
          type="description"
          name="description"
          value={description}
          onChange={handleDescription}
        />

        <input type="file" onChange={handleFileUpload}></input>

        <button type="submit">Post!</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddPostPage;
