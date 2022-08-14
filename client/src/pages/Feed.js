import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Button, Container, CssBaseline, Grid, Input, List, TextField, Typography } from '@mui/material';


const Feed = () => {
    const [loadPost, setLoadPost] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const user = useSelector((state) => state.userReducer);
    const [content, setContent] = useState("");
    const [formSubmit, setFormSubmit] = useState(false);
    const [image, setImage] = useState("");
  
    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])


    const handlePost = () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("content", content);
        
        axios.post(`http://localhost:3050/api/post/add`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        .then((res) => {
            setFormSubmit(true);
        })
        .catch((err) => console.log('----------------------------------------',err))
    }

    return (
        <div style={{backgroundColor: "#E3E3E3"}}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <NavBar user={user}/>
                <Grid container justifyContent="center" alignItems="center" mt={2}>
                    {user.profilImage !== null && <Avatar src={"http://localhost:3050/Images/" + user.profilImage} alt="user" key={user.id}/>}
                    <Typography variant='h5'>Bienvenue {user.prenom}</Typography>
                </Grid>

                <Grid container justifyContent="center">
                    <TextField variant='filled' fullWidth type="text" onChange={(e) => setContent(e.target.value)} name='content' placeholder='Ecrivez'></TextField>
                    <Input type="file" onChange={(e) => setImage(e.target.files[0])} name='image'></Input>
                    <Button type="submit" style={{backgroundColor: "#FF9292"}} fullWidth variant="contained" endIcon={<SendIcon />} onClick={handlePost}>Publier</Button> 
                </Grid>
                
                <List>
                    {posts.length > 0 && posts.slice().reverse().map((post) => {
                        return <PostCard post={post} key={post.id} />;
                    })}
                </List>
            </Container>
        </div>
    )
}

export default Feed;