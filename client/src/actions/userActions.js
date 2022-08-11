import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = (uid) => {
  return (dispatch) => {
    fetch(`http://localhost:3050/api/user/${uid}`, {
      method: "GET",
      Accept: "application/json"
    })
    .then((res) => res.json())
    .then((res) => {
      return dispatch({ type: "GET_USER", payload: res });
    })
    .catch((err) => console.log(err));
  }
};

export const updateUser = (nom, prenom, dateNaissance, department ) => {
  return (dispatch) => {
    axios('http://localhost:3050/api/user/update', {
      method: "PUT",
      data: { nom, prenom, dateNaissance, department },
      withCredentials: true
    })
    .then((res) => {
      return dispatch({ type: "UPDATE_BIO", payload: nom, prenom, dateNaissance, department });
    })
    .catch((err) => console.log(err));
  }
};

