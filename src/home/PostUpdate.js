import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetails, postUpdate } from '../api-helpers/helpers';
import { Box, FormLabel, TextField } from '@mui/material';

const PostUpdate = () => {
  const [post, setPost] = useState();
  const [inputs, setInputs] = useState({
    title: '',
    body: '',
    user_id: '',
  });
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post);
        setInputs({
          title: data.post.title,
          body: data.post.body,
          user_id: data.post.user_id,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    postUpdate(inputs, id).then((data) =>
      console.log(data).catch((err) => console.log(err))
    );
  };
  return (
    <Box display="flex" flexDirection={'column'} width="100%" height="100%">
      <Box display="flex" margin="auto">
        <Typography fontWeight={'bold'} variant="h4">
          Write Your New Post
        </Typography>
      </Box>
      {post && (
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
            <FormLabel>User ID</FormLabel>
            <TextField
              onChange={handleChange}
              name="user_id"
              value={inputs.user_id}
              variant="standard"
              margin="normal"
            />
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
      )}
    </Box>
  );
};

export default PostUpdate;
