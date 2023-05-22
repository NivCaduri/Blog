import React, {useEffect} from "react";
import PostItem from "./PostItem";
import {useParams} from "react-router-dom";

const OpenPost = () => {
    const id = useParams().id;
    useEffect(() => {}, []);
    return (
        <div>
            <PostItem />
        </div>
    );
};

export default OpenPost;