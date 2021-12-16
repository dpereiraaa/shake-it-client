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
        console.log("response.data :>> ", response.data);
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
    <div className="flex flex-col justify-center items-center bg-red-50 h-full pt-16">
      <div className="">
        {allposts &&
          allposts.map((onePost) => {
            return (
              <div
                key={onePost._id}
                className="mb-10 border border-gray-500 rounded p-10 pl-20 pr-20"
              >
                <span className="flex items-center space-x-4 mb-4">
                  <img
                    src={onePost.post_author.image}
                    width="50px"
                    alt=""
                    className="rounded-full"
                  ></img>
                  <p className="font-semibold text-xl">
                    {onePost.post_author.name}
                  </p>
                </span>
                <span className="">
                  <img
                    src={onePost.image}
                    width="300px"
                    alt=""
                    className="rounded-lg border border-black"
                  ></img>
                </span>
                <span className="flex mt-2 space-x-1">
                  <p className="font-semibold text-base">
                    {onePost.post_author.name}:
                  </p>
                  <p> {onePost.description}</p>
                </span>
                <span className="flex justify-start mt-3">
                  <form onSubmit={(e) => handleComment(e, onePost._id)}>
                    <button type="submit">Comment: </button>
                    <input
                      type="text"
                      name="comment_description"
                      value={comment_description}
                      onChange={handleCommentChange}
                      className="bg-red-50 border border-gray-400 focus:border-black focus:bg-gray-50 ml-2 "
                    ></input>
                  </form>
                </span>
                <span className="flex flex-col text-left">
                  <span>
                    {onePost &&
                      onePost.comments.map((comment) => {
                        return (
                          <div>
                            <p>Comments:</p>
                            <div key={comment._id} className="flex rounded">
                              <p className="font-semibold text-base mr-2">
                                {comment.comment_author.name}:
                              </p>
                              <p>{comment.comment_description}</p>
                            </div>
                          </div>
                        );
                      })}
                  </span>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllPostsPage;
