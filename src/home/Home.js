import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PostItem from "./PostItem";
import { getAllPosts } from "../api-helpers/helpers";

const Home = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    getAllPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      padding={3}
      justifyContent="center"
      alignItems={"center"}
    >
      {" "}
      {posts &&
        posts.map((item, index) => (
          <PostItem
            id={item._id}
            title={item.title}
            body={item.body}
            user_id={item.user_id}
            image={item.image}
            key={index}
          />
        ))}
    </Box>
  );
};

export default Home;
