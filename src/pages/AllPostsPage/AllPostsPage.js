import axios from "axios";
import { useState, useEffect } from "react";

function AllPostsPage() {
  const [allposts, setAllPosts] = useState(null);
  const [comment_description, setComment_description] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [commentMade, setCommentMade] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5005/api/allposts", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        let mostRecent = response.data.reverse();
        setAllPosts(mostRecent);
      } catch (error) {}
    };
    fetchData();
  }, [commentMade]);

  const handleCommentChange = (e) => setComment_description(e.target.value);

  const handleComment = async (e, postId) => {
    e.preventDefault();
    try {
      const requestBody = { comment_description };

      const authToken = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5005/api/add-post-comment/" + postId,
        requestBody,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setComment_description("");
      setCommentMade(true);
    } catch (error) {
      setErrorMessage("Something went wrong");
      setComment_description("");
    }
    setCommentMade(false);
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
                  <div key={comment._id}>
                    <p>{comment.comment_description}</p>
                  </div>
                );
              })}
              <p>Add comment:</p>
              <form onSubmit={(e) => handleComment(e, onePost._id)}>
                <input
                  type="text"
                  name="comment_description"
                  value={comment_description}
                  onChange={handleCommentChange}
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
