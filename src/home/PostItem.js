import React from "react";
import {
    Avatar,
    Box, Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography
} from "@mui/material";
import {red} from "@mui/material/colors";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";

const PostItem = (id) => {
    return (
        <Card sx={{
            Width: "50%",
            height: "30vh",
            margin: 1,
            padding: 1,
            display: "flex",
            flexDirection: "column",
            boxShadow: "5px 5px 10px #ccc"
        }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
                }
                action={
                    <IconButton aria-label="settings" LinkComponent={Link} to={`/post/${id}`}>{<OpenInNewIcon />}</IconButton>
                }
                subheader="September 14, 2016"
            />
            <img
                height="194"
                src=""
                alt=""
            />
            <CardContent>
                <Typography paddingBottom={1} variant="h6" color="text.secondary">
                    Blog post #1
                </Typography>
                <hr />
                <Box paddingTop={1}>
                    <Typography width="170px" fontWeight={"bold"} variant="div">
                        Niv Caduri:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        My first blog post is all about my blog post and how to write a new post in my blog, you can find it here.
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ marginLeft: "auto" }}>
                <IconButton color="warning">
                    <EditIcon />
                </IconButton>
                <IconButton color="error">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PostItem;