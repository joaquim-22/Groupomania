import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Avatar, Button, Container, CssBaseline, Grid, Input, List, Snackbar, TextField, Typography } from '@mui/material';


const Feed = ({ user }) => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        dispatch(getPosts());
    },[dispatch])


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
            dispatch(getPosts());
            onSucess(res.data.success);
        })
        .catch((res) => onError(res.response.data.error))
    }

    //Snackbar Error
    const onSucess = (success) => {
        setMsg(success)
        setOpenSuccess(true);
    }    
      
    const onError = (error) => {
        setMsg(error)
        setOpen(true);
    }

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false) || setOpenSuccess(false);
    };

    return (
        <div style={{backgroundColor: "#E3E3E3"}}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <NavBar user={user}/>
                <Grid container justifyContent="center" alignItems="center" mt={2}>
                    {user.profilImage !== null && <Avatar src={"http://localhost:3050/Images/" + user.profilImage} alt="user" key={user.id}/>}
                    <Typography variant='h5'>Bienvenue {user.prenom}</Typography>
                </Grid>

                <Grid container justifyContent="center" mt={2}>
                    <TextField variant='filled' fullWidth type="text" onChange={(e) => setContent(e.target.value)} name='content' placeholder='Ecrivez'/>
                    <Input sx={{m: 2}} type="file" onChange={(e) => setImage(e.target.files[0])} name='image'></Input>
                    <Button type="submit" style={{backgroundColor: "#FF9292"}} fullWidth variant="contained" endIcon={<SendIcon />} onClick={handlePost}>Publier</Button> 
                </Grid>
                
                <List>
                    {
                    posts.length > 0 && posts.slice().reverse().map((post) => {
                        return <PostCard post={post} key={post.id} user={user}/>;
                    })}
                </List>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Feed;