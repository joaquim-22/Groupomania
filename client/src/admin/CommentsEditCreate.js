import React from 'react';
import {DateInput, Edit, Create, SimpleForm, TextInput} from 'react-admin';

export const CommentEdit = (props) => {

    return (
    <Edit resource='post/comments/update' {...props}>
        <SimpleForm>
            <TextInput disabled source='id'/>
            <TextInput disabled source='userId'/>
            <TextInput source='newCommentContent'/>
            <DateInput disabled source='createdAt'/>
            <DateInput disabled source='updatedAt'/>
        </SimpleForm>
    </Edit>
    )
}

export const CommentCreate = (props) => (
    <Create resource='post/add' {...props}>
        <SimpleForm>
            <TextInput disabled source='id'/>
            <TextInput source='userId'/>
            <TextInput source='commentContent'/>
            <DateInput disabled source='createdAt'/>
            <DateInput disabled source='updatedAt'/> 
        </SimpleForm>
    </Create>
);