import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  EmailField
} from 'react-admin'

const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='prenom' />
        <TextField source='nom' />
        <EmailField source='email' />
        <DateField source='dateNaissance'/>
        <TextField source='profilImage'/>
        <TextField source='department'/>
        <EditButton basepath='user'/>
        <DeleteButton resource='user/delete'/>
      </Datagrid>
    </List>
  )
}

export default UserList;