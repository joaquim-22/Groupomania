import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  ReferenceField
} from 'react-admin';

const PostList = (props) => {

  return (
    <List {...props}>
      <Datagrid >
        <TextField source='id' />
        <ReferenceField source="userId" reference="User/all/users"><TextField source="id" /></ReferenceField>
        <TextField source='content'/>
        <TextField source='image'/>
        <DateField source='createdAt'/>
        <DateField source='updatedAt'/>
        <EditButton basepath='post/one'/>
        <DeleteButton resource='post/delete'/>
      </Datagrid>
    </List>
  )
}

export default PostList;