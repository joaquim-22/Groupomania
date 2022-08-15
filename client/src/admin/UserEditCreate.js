import React from 'react';
import {DateInput, Edit, Create, SimpleForm, TextInput, EmailField, PasswordInput } from 'react-admin';

export const UserEdit = (props) => {

    return (
    <Edit resource='user/update' {...props}>
        <SimpleForm>
            <TextInput disabled source='id'/>
            <TextInput source='prenom'/>
            <TextInput source='nom'/>
            <DateInput source='dateNaissance'/>
            <TextInput source='profilImage'/>
            <TextInput source='department'/>
        </SimpleForm>
    </Edit>
    )
}

export const UserCreate = (props) => (
    <Create resource='user/register' {...props}>
        <SimpleForm>
            <TextInput source='prenom'/>
            <TextInput source='nom'/>
            <DateInput source='dateNaissance'/>
            <TextInput source='email' />
            <PasswordInput source='password'/>
            <TextInput source='department'/>
        </SimpleForm>
    </Create>
);