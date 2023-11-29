import React, { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ModeEditOutLineIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { getUserDetails, postDelete } from '../api-helpers/helpers';

const PostItem = ({ id, title, body, user_id, created_at }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails()
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);
  const [open, setOpen] = useState(false);
  const isLoggedInUser = () => {
    if (user.id === user_id) {
      return true;
    }
    return false;
  };

  const handleDelete = () => {
    postDelete(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setOpen(true);
  };
  return (
    <>
      {user && (
        <Card
          sx={{
            Width: '50%',
            height: '40vh',
            margin: 1,
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '5px 5px 10px #ccc',
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
            }
            // action={
            //   <IconButton
            //     aria-label="settings"
            //     LinkComponent={Link}
            //     to={`/post/${id}`}
            //   >
            //     {<OpenInNewIcon />}
            //   </IconButton>
            // }
            title={user_id}
            // subheader={created_at}
          />
          <img height="194" src="" alt="" />
          <CardContent>
            <Typography paddingBottom={1} variant="h6" color="text.secondary">
              {title}
            </Typography>
            <hr />
            <Box paddingTop={1}>
              <Typography variant="body2" color="text.secondary">
                {body}
              </Typography>
            </Box>
          </CardContent>
          {isLoggedInUser() && (
            <CardActions sx={{ marginLeft: 'auto' }}>
              <IconButton
                LinkComponent={Link}
                to={`/update_post/${id}`}
                color="warning"
              >
                <ModeEditOutLineIcon />
              </IconButton>
              <IconButton onClick={handleDelete} color="error">
                <DeleteForeverIcon />
              </IconButton>
            </CardActions>
          )}
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity="success"
              sx={{ width: '100%' }}
            >
              Post has been deleted
            </Alert>
          </Snackbar>
        </Card>
      )}
    </>
  );
};

export default PostItem;
