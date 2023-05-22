import React from "react";
import {Box, Button, FormLabel, TextField, Typography} from "@mui/material";

const New = () => {
    return (
        <Box
            display="flex"
            flexDirection={"column"}
            width="100%"
            height="100%"
        >
            <Box display="flex" margin="auto">
                <Typography fontWeight={"bold"} variant="h4">
                    Write Your New Post
                </Typography>
            </Box>
            <form>
                <Box
                    padding={3}
                    display="flex"
                    margin="auto"
                    flexDirection={"column"}
                    width="80%"
                >
                    <FormLabel>Title</FormLabel>
                    <TextField variant="standard" margin="normal" />
                    <FormLabel>Text</FormLabel>
                    <TextField variant="standard" margin="normal" />
                    <FormLabel>Image URL</FormLabel>
                    <TextField variant="standard" margin="normal" />
                    <FormLabel>Date</FormLabel>
                    <TextField variant="standard" margin="normal" />
                    <Button
                        color="warning"
                        sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}
                        variant="contained"
                    >
                        Post
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default New;