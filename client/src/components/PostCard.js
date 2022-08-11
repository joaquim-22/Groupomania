import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import '../styles/postCard.css';
import CommentsCard from '../components/CommentsCard';
import LikeButton from './LikeButton';
import { deletePost, updatePost, addComment, getComments } from "../actions/postActions";

const PostCard = ({ post }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadComments, setLoadComments] = useState(false);
    const users = useSelector((state) => state.usersReducer);
    const user = useSelector((state) => state.userReducer);
    const comments = useSelector((state) => state.commentReducer);
    const [newContent, setNewContent] = useState("");
    const [commentContent, setCommentContent] = useState("");

    useEffect(() => {
        (users.length > 0) && setLoading(false);
    }, [users])

    useEffect(() => {
        if(loadComments) {
            dispatch(getComments());
            setLoadComments(false)
        }
    }, [loadComments, dispatch])

    const handleComment = () => {
        if (commentContent) {
            dispatch(addComment(post.id, commentContent))
            setCommentContent('');
        }
    };

    const deleteQuote = () => dispatch(deletePost(post.id));
    const updateQuote = () => dispatch(updatePost(post.id, newContent));

    function convertDateForHuman (createdAt) {
        let converted = new Date(createdAt);
        return converted.toLocaleString();
    }

    return (
        <li className='posts-cards' key={post.id}>
            <div id='infos-user'>
                <div id="image-user">
                    {users &&
                        users.map((user) => {
                            return (user.profilImage !== null && user.id === post.userId) ? <img src={"http://localhost:3050/Images/" + user.profilImage} alt="user" key={user.id}/>
                            : null
                    })
                    }
                </div>
                <span>
                    {users &&
                        users.map((user) => {
                            if (user.id === post.userId) return user.prenom + ' ' + user.nom
                            else return null;
                        })
                        .join("")
                    }
                </span>

                {(user.id === post.userId || user.isAdmin === true) ? 
                <button className='button-delete-post' onClick={updateQuote}>Update</button>
                : null}

                {(user.id === post.userId  || user.isAdmin === true) ? 
                <button className='button-delete-post' onClick={deleteQuote}>Delete</button>
                : null}

                <div id='post-date'>
                    {convertDateForHuman(post.createdAt).slice(0, -3)}
                </div>

            </div>

            {(user.id === post.userId || user.isAdmin === true) ? 
            <input onChange={(e) => setNewContent(e.target.value)} id='post-content' placeholder={post.content}></input>
            : <span>{post.content}</span>
            }

            {
            post.image !== null ? <img src={"http://localhost:3050/Images/" + post.image} alt="Post Pic" key={post.id}/>
            : null    
            }

            <div className='posts-button-Like'>
                <LikeButton post={post.id}/>
            </div>
            <form onSubmit={handleComment} >
                <input onChange={(e) => setCommentContent(e.target.value)}></input>
                <button type='submit'>Send</button>
            </form>

            <div className='post-comments'>
                <ul>
                    {
                    comments.length > 0 && comments.slice().reverse().map((comment) => {
                        if (post.id === comment.postId) return <CommentsCard comment={comment} key={comment.id}/>
                        else return null
                    })
                    }
                </ul>
            </div>
        </li>
    )
}

export default PostCard;