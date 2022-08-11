import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/comments.css';
import { deleteComment, updateComment } from "../actions/postActions";

const CommentsCard = ({ comment }) => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer);
    const user = useSelector((state) => state.userReducer);
    const [newCommentContent, setNewCommentContent] = useState("");
    const deleteComments = () => dispatch(deleteComment(comment.id));
    const updateComments = () => dispatch(updateComment(comment.id, newCommentContent));


    return (
        <div className='comments-card'>
            <div className='user-infos-comments'>
                <div className='photo-user-comment'>
                    {users &&
                        users.map((user) => {
                            return (user.profilImage !== null && user.id === comment.userId) ? <img src={"http://localhost:3050/Images/" + user.profilImage} alt="user" key={user.id}/>
                            : null
                        })
                    }
                </div>
                <div id='info-comment-username'>
                    {users &&
                        users.map((user) => {
                                if (comment.userId === user.id) return user.prenom + ' ' + user.nom
                                else return null;
                            })
                            .join("")
                    }
                </div>
                <div className='delete-comment'>
                    {(user.id === comment.userId || user.isAdmin === true) ? 
                    <button className='button-delete-comment' onClick={deleteComments}>Delete</button>
                    : null}
                </div>
                <div className='update-comment'>
                    {(user.id === comment.userId || user.isAdmin === true) ? 
                    <button className='button-delete-post' onClick={updateComments}>Update</button>
                    : null}
                </div>
            </div>
            <div className='comment-content'>
                {(user.id === comment.userId || user.isAdmin === true) ? 
                <input onChange={(e) => setNewCommentContent(e.target.value)} id='comment-content' placeholder={comment.content}></input>
                : <span>{comment.content}</span>
                }
            </div>
        </div>
    )
}

export default CommentsCard;