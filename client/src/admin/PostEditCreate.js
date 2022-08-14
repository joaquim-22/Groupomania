import React from 'react';
import {DateInput, Edit, Create, SimpleForm, TextInput, useGetOne} from 'react-admin';

export const PostEdit = (props) => {

    return (
    <Edit resource='post/update' {...props}>
        <SimpleForm>
            <TextInput disabled source='id'/>
            <TextInput disabled source='userId'/>
            <TextInput source='newContent'/>
            <DateInput disabled source='createdAt'/>
            <DateInput disabled source='updatedAt'/>
        </SimpleForm>
    </Edit>
    )
}

export const PostCreate = (props) => (
    <Create resource='post/add' {...props}>
        <SimpleForm>
            <TextInput source="userId"/>
            <TextInput source="content"/> 
        </SimpleForm>
    </Create>
);