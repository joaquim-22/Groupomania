import axios from 'axios';

export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const LIKE_POST = "LIKE_POST";
export const GET_LIKES = "GET_LIKES";
export const ADD_COMMENT = "ADD_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_COMMENTS = "DELETE_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export const getPosts = () => {
  return (dispatch) => {
      axios(`http://localhost:3050/api/post/all`,{
        method: "GET",
      })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err + 'error'));
  }
};

export const updatePost = (postId, newContent) => {
  return (dispatch) => {
    axios(`http://localhost:3050/api/post/update/${postId}`, {
      method: "PUT",
      data: { newContent },
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: UPDATE_POST, payload: { newContent }})
    })
    .catch((err) => console.log(err))
  }
}

export const deletePost = (postId) => {
  return (dispatch) => {
    axios(`http://localhost:3050/api/post/delete/${postId}`, {
      method: "DELETE",
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: DELETE_POST, payload: { postId }})
    })
    .catch((err) => console.log(err))
  }
}

export const likePost = (postId) => {
  return (dispatch) => {
    axios(`http://localhost:3050/api/post/like/${postId}`, {
      method: "POST",
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: { postId }})
    })
    .catch((err) => console.log(err))
  }
}

export const getLikes = () => {
  return (dispatch) => {
      axios(`http://localhost:3050/api/post/likes`,{
        method: "GET"
      })
      .then((res) => {
        dispatch({ type: GET_LIKES, payload: res.data });
      })
      .catch((err) => console.log(err + 'error'));
  }
};

export const addComment = (postId, commentContent) => {
  return (dispatch) => {
    axios(`http://localhost:3050/api/post/comments/${postId}`, {
      method: "POST",
      data: {
        commentContent
      },
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: ADD_COMMENT, payload: { postId, commentContent }})
    })
    .catch((err) => console.log(err))
  }
}

export const getComments = () => {
  return (dispatch) => {
      axios(`http://localhost:3050/api/post/comments/all`,{
        method: "GET",
      })
      .then((res) => {
        dispatch({ type: GET_COMMENTS, payload: res.data });
      })
      .catch((err) => console.log(err + 'error'));
  }
};

export const updateComment = (postId, newCommentContent) => {
  return (dispatch) => {
    axios(`http://localhost:3050/api/post/comments/update/${postId}`, {
      method: "PUT",
      data: { newCommentContent },
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: UPDATE_COMMENT, payload: { newCommentContent }})
    })
    .catch((err) => console.log(err))
  }
}

export const deleteComment = (commentId) => {
  return (dispatch) => {
    axios(`http://localhost:3050/api/post/comments/delete/${commentId}`, {
      method: "DELETE",
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: DELETE_COMMENTS, payload: { commentId }})
    })
    .catch((err) => console.log(err))
  }
};