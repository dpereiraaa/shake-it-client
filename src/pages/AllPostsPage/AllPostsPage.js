import axios from "axios";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

function AllPostsPage() {
  const [allposts, setAllPosts] = useState(null);
  const [comment_description, setComment_description] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5005/api/allposts", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setAllPosts(response.data);
        console.log("allposts :>> ", response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleComment = async (e) => {
    try {
      e.preventDefault();

      setComment_description(e.target.value);

      const requestBody = { comment_description };

      const authToken = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5005/api/add-post-comment/:postId",
        requestBody,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="m-10 flex flex-col justify-center items-center">
      {allposts &&
        allposts.map((onePost) => {
          return (
            <div key={onePost._id}>
              <p>{onePost.post_author.name}</p>
              <p>{onePost.title}</p>
              <p>{onePost.description}</p>
              <img src={onePost.image} width="300px"></img>
              {onePost.comments.map((comment) => {
                return (
                  <div>
                    <p>{comment.comment_description}</p>
                  </div>
                );
              })}
              <p>Add comment:</p>
              <form onSubmit={handleComment}>
                <input
                  type="text"
                  name="comment_description"
                  value={comment_description}
                ></input>
                <button type="submit">Comment!</button>
              </form>
            </div>
          );
        })}
    </div>
  );
}

export default AllPostsPage;
