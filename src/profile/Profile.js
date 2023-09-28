import React, { useState } from 'react';
import { useEffect } from 'react';
import { getUserDetails, userLogout } from '../api-helpers/helpers';
import { Box, Button, Typography } from '@mui/material';
import PostItem from '../home/PostItem';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails()
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);
  const handleClick = () => {
    dispatch(loginActions.logout());
    userLogout();
    navigate('/');
  };
  return (
    <Box display="flex" flexDirection={'column'}>
      {user && (
        <>
          {' '}
          <Typography
            textAlign={'center'}
            variant="h3"
            fontFamily={'quicksand'}
            padding={2}
          >
            User profile
          </Typography>
          <Typography fontFamily={'quicksand'} padding={1} textAlign="left">
            Name: {user.name}
          </Typography>
          <Typography fontFamily={'quicksand'} padding={1} textAlign="left">
            Username: {user.username}
          </Typography>
          <Button
            onClick={handleClick}
            sx={{ mr: 'auto', width: '15%' }}
            color="warning"
            variant="contained"
          >
            Logout
          </Button>
          <Box
            display="flex"
            flexDirection={'column'}
            justifyContent="center"
            alignItems={'center'}
          >
            {/* {user.posts.map((post, index) => (
              <PostItem
                key={index}
                title={post.title}
                body={post.body}
                created_at={post.created_at}
                id={post.id}
                user={user._id}
              />
            ))} */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
