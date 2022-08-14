import React from "react";
import { Admin, Resource, ListGuesser, fetchUtils, EditGuesser } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import PostList from './PostList'
import { PostEdit, PostCreate } from './PostEditCreate';
import UserList from "./UserList";

const AdminView = () => {

  const httpClient = (url, options) => {
    if (options) {
      options.credentials = "include";
    }
    return fetchUtils.fetchJson(url, options);
  };

    return (
            <Admin basename="/admin" dataProvider={restProvider('http://localhost:3050/api', httpClient)}>
              <Resource name='user/all/users' list={UserList}/>
              <Resource name='post/all' list={PostList} edit={PostEdit} create={PostCreate}/>
            </Admin>
          )
}

export default AdminView;