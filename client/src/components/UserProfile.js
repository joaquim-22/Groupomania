import React, { useEffect, useState } from 'react';
import { getPosts } from '../actions/postActions';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { CssBaseline, Container, Button, Box, Avatar, CardHeader, Card, CardContent, Typography, TextField, List } from '@mui/material';

const UserProfile = ({user}) => {
    const [loadPost, setLoadPost] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])
    
    return (
        <div style={{backgroundColor: "#E3E3E3"}}>
            <CssBaseline/>
            <Card sx={{ width: 1 }}>
                <CardHeader 
                    avatar={(
                        user.profilImage !== null) ? <Avatar src={"http://localhost:3050/Images/" + user.profilImage} alt="user" key={user.id} sx={{ width: 100, height: 100 }}/>
                        : null
                    }
                    title={user.prenom + ' ' + user.nom}
                />
                <CardContent>
                    <Box mb={3}>
                        <Typography>Date Naissance</Typography>
                        <Typography>{user.dateNaissance}</Typography>
                    </Box>
                    <Box mb={3}>
                        <Typography>Départment</Typography>
                        <Typography>{user.department}</Typography>
                    </Box>
                </CardContent>
            </Card>
            <List>
                {
                posts.length > 0 && posts.slice().reverse().map((post) => {
                    if(user.id === post.userId) return <PostCard post={post} user={user} key={post.id} />
                    else return null
                })}
            </List>
        </div>
    )
}

export default UserProfile;