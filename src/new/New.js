import React, { useState } from 'react';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { addPost } from '../api-helpers/helpers';

const New = () => {
  const [inputs, setInputs] = useState({
    title: '',
    body: '',
    imageUrl: '',
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addPost(inputs)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Box display="flex" flexDirection={'column'} width="100%" height="100%">
      <Box display="flex" margin="auto">
        <Typography fontWeight={'bold'} variant="h4">
          Write Your New Post
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          padding={3}
          display="flex"
          margin="auto"
          flexDirection={'column'}
          width="80%"
        >
          <FormLabel>Title</FormLabel>
          <TextField
            onChange={handleChange}
            name="title"
            value={inputs.title}
            variant="standard"
            margin="normal"
          />
          <FormLabel>Body</FormLabel>
          <TextField
            onChange={handleChange}
            name="body"
            value={inputs.body}
            variant="standard"
            margin="normal"
          />
          <FormLabel>Image URL</FormLabel>
          <TextField
            onChange={handleChange}
            name="imageUrl"
            value={inputs.imageUrl}
            variant="standard"
            margin="normal"
          />
          <FormLabel>Date</FormLabel>
          <TextField variant="standard" margin="normal" />
          <Button
            type="submit"
            color="warning"
            sx={{ width: '50%', margin: 'auto', mt: 2, borderRadius: 7 }}
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
