import React from "react";
import {Box} from "@mui/material";
import PostItem from "./PostItem";

const Home = () => {
    return (
        <Box
            display="flex"
            flexDirection={"column"}
            padding={3}
            justifyContent="center"
            alignItems={"center"}
        >
            {" "}
            {[1, 2, 3].map((item) => (
                <PostItem key={item} />
            ))}
        </Box>
    );
};

export default Home;