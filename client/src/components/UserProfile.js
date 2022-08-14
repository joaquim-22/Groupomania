import React, { useEffect, useDispatch, useState } from 'react';
import { getPosts } from '../actions/postActions';
import NavBar from '../components/NavBar';
import { useSelector } from "react-redux";
import ProfileUpdate from '../components/ProfileUpdate';
import axios from 'axios';
import { CssBaseline, Container, Button, Box } from '@mui/material';

const UserProfile = () => {
/*     const user = useSelector((state) => state.userReducer)
    const [loadPost, setLoadPost] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer); */

/*     useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch]) */
    return (
        <div style={{backgroundColor: "#E3E3E3"}}>

        </div>
    )
}

export default UserProfile;