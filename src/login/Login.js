import React, { useState } from 'react';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { sendLoginRequest } from '../api-helpers/helpers';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store';

const Login = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    if (isSignup) {
      sendLoginRequest(true, inputs)
        .then((data) => console.log(data))
        .then(() => {
          dispatch(loginActions.login());
        })
        .catch((err) => console.log(err));
    } else {
      sendLoginRequest(false, inputs)
        .then((data) => console.log(data))
        .then(() => {
          dispatch(loginActions.login());
        })
        .catch((err) => console.log(err));
    }
  };
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Box
      width="40%"
      margin="auto"
      marginTop={10}
      borderRadius={10}
      boxShadow={'5px 5px 10px #ccc'}
    >
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={'column'}
          width="60%"
          padding={5}
          margin="auto"
        >
          <Typography padding={1} variant="h4" textAlign="center">
            {isSignup ? 'Signup' : 'Login'}
          </Typography>
          {isSignup && (
            <>
              <FormLabel>Name</FormLabel>
              <TextField
                onChange={handleChange}
                value={inputs.name}
                name="name"
                required
                margin="normal"
              />
            </>
          )}
          <FormLabel>Username</FormLabel>
          <TextField
            onChange={handleChange}
            value={inputs.username}
            name="username"
            required
            margin="normal"
          />
          <FormLabel>Password</FormLabel>
          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            type="password"
            required
            margin="normal"
          />
          <Button
            sx={{ mt: 2, borderRadius: 10 }}
            type="submit"
            variant="contained"
          >
            {isSignup ? 'Signup' : 'Login'}
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ mt: 2, borderRadius: 10 }}
            variant="outlined"
          >
            Change to {isSignup ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
