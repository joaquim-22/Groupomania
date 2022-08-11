import axios from 'axios';

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return axios(`http://localhost:3050/api/user/all/users`)
    .then((res) => {
      dispatch({ type: "GET_USERS", payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};