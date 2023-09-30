import axios from 'axios';

export const getAllPosts = async () => {
  const res = await axios.get('/posts');
  if (res.status !== 200) {
    return console.log('Some Error Occurred');
  }

  const data = res.data;
  return data;
};

export const sendLoginRequest = async (signup, data) => {
  const res = await axios
    .post(
      `/users/${signup ? 'signup' : 'login'}`,
      {
        name: data.name ? data.name : '',
        username: data.username,
        password: data.password,
      },
      { withCredentials: true }
    )
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    return console.log('Unable to Login');
  }
  const resData = await res.data;
  return resData;
};

export const addPost = async (data) => {
  const res = await axios
    .post(
      '/posts',
      {
        title: data.title,
        body: data.body,
      },
      { withCredentials: true }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log('Error Occurred');
  }

  const resData = await res.data;
  return resData;
};

export const getPostDetails = async (id) => {
  const res = await axios.get(`/posts/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log('Unable to fetch post');
  }
  const resData = await res.data;
  return resData;
};

export const postUpdate = async (data, id) => {
  const res = await axios
    .put(`/posts/${id}`, {
      title: data.title,
      body: data.body,
      user_id: data.user_id,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log('Unable to update');
  }

  const resData = await res.data;
  return resData;
};

export const postDelete = async (id) => {
  try {
    const res = await axios.delete(`/posts/${id}`, { withCredentials: true });

    if (res && res.status === 200) {
      const resData = await res.data;
      return resData;
    } else {
      console.log(
        'Unable to delete. Status code:',
        res ? res.status : 'Unknown'
      );
    }
  } catch (err) {
    console.log('An error occurred while logging out:', err);
  }
};

export const getUserDetails = async () => {
  const res = await axios
    .get('/profile', { withCredentials: true })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log('No user found');
  }
  const resData = await res.data;
  return resData;
};

export const userLogout = async () => {
  try {
    const res = await axios.delete('/profile', { withCredentials: true });

    if (res && res.status === 200) {
      const resData = await res.data;
      return resData;
    } else {
      console.log(
        'Unable to logout. Status code:',
        res ? res.status : 'Unknown'
      );
    }
  } catch (err) {
    console.log('An error occurred while logging out:', err);
  }
};
