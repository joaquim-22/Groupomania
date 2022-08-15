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

const CommentsList = (props) => {

  return (
    <List {...props}>
      <Datagrid >
        <TextField source='id' />
        <ReferenceField source="userId" reference="User/all/users"><TextField source="id" /></ReferenceField>
        <TextField source='content'/>
        <DateField source='createdAt'/>
        <DateField source='updatedAt'/>
        <EditButton basepath='post/comments'/>
        <DeleteButton resource='post/comments/delete'/>
      </Datagrid>
    </List>
  )
}

export default CommentsList;