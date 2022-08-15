import React from "react";
import { Admin, Resource, fetchUtils } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import PostList from './PostList'
import { PostEdit, PostCreate } from './PostEditCreate';
import UserList from "./UserList";
import { UserEdit, UserCreate } from './UserEditCreate';
import CommentsList from "./CommentsList";
import { CommentEdit, CommentCreate } from './CommentsEditCreate';

const AdminView = () => {

  const httpClient = (url, options) => {
    if (options) {
      options.credentials = "include";
    }
    return fetchUtils.fetchJson(url, options);
  };

    return (
      <Admin basename="/admin" dataProvider={restProvider('http://localhost:3050/api', httpClient)}>
        <Resource name='user/all/users' list={UserList} edit={UserEdit} create={UserCreate}/>
        <Resource name='post/all' list={PostList} edit={PostEdit} create={PostCreate}/>
        <Resource name='post/comments/all' list={CommentsList} edit={CommentEdit} create={CommentCreate}/>
      </Admin>
    )
}

export default AdminView;