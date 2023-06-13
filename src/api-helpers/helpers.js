import axios from "axios";

export const getAllPosts = async () => {
  const res = await axios.get("/posts");
  if (res.status !== 200) {
    return console.log("Some Error Occurred");
  }

  const data = res.data;
  return data;
};

export const sendLoginRequest = async (signup, data) => {
  const res = await axios
    .post(`/users/${signup ? "signup" : "login"}/`, {
      name: data.name ? data.name : "",
      username: data.username,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    return console.log("Unable to Login");
  }
  const resData = await res.data;
  return resData;
};

export const addPost = async (data) => {
  const res = await axios
    .post("/posts/", {
      title: data.title,
      body: data.body,
      imageUrl: data.imageUrl,
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
