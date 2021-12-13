import axios from "axios";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

function AllPostsPage() {
  const [allposts, setAllPosts] = useState(null);

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

  return (
    <div>
      {allposts &&
        allposts.map((onePost) => {
          return (
            <div key={onePost._id}>
              <p>{onePost.title}</p>
              <p>{onePost.description}</p>
              <img src={onePost.image} width="300px"></img>
              <p>{onePost.post_author.name}</p>
            </div>
          );
        })}
    </div>
  );
}

export default AllPostsPage;
