import axios from "axios";

export const getUserList = () => axios.get("http://localhost:3333/users");

export const addUser = (newUser) =>
  axios.post("http://localhost:3333/users", newUser);
