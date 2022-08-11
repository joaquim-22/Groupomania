import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';
import axios from 'axios';
//import Cookies from 'js-cookie';
import Logo from '../components/Logo';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import '../styles/feed.css';


const Feed = () => {
    const [loadPost, setLoadPost] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const user = useSelector((state) => state.userReducer);
    const [content, setContent] = useState("");
    const [setFormSubmit] = useState(false);
    const [image, setImage] = useState("");
  
    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])


    const handlePost = () => {
        const formData = new FormData();
        console.log(image)
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
        <div className='main-container-feed'>
            <Logo/>
            <NavBar/>
            <h2 id='bienvenue-feed'>Bienvenue {user.prenom}</h2>

            <div className='add-post'>
                <form className='form-add-post'>
                    <input onChange={(e) => setContent(e.target.value)} id='input-add-post' name='content'></input>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} id='file' name='image'></input>
                    <button type="submit" className="submitButtonLogin" onClick={handlePost} >Publier</button>
                </form>
            </div>
            
            <div className='container-card'>
                <ul>
                    {posts.length > 0 && posts.slice().reverse().map((post) => {
                        return <PostCard post={post} key={post.id} />;
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Feed;