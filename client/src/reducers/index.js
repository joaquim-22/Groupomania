import { combineReducers } from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import likesReducer from './likesReducer';

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    commentReducer,
    likesReducer
  });