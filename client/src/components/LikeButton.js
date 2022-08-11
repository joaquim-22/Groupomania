import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLikes, likePost } from "../actions/postActions";
import '../styles/likeButton.css';

const LikeButton = ({ post }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const likes = useSelector((state) => state.likesReducer);
    const user = useSelector((state) => state.userReducer);
    const users = useSelector((state) => state.usersReducer);

    let likesList = likes.length > 0 && likes.filter(like => like.postId === post)

    useEffect(() => {
        dispatch(getLikes())
    }, [liked, dispatch]);

    useEffect(() => {
        if (likes.length > 0 && likes.find(like => like.userId === user.id && like.postId === post)) setLiked(true)
        else setLiked(false)
      }, [user.id, likes, post]);

    const submitLike = () => {
        dispatch(likePost(post));
        setLiked(true);
    }
    
    const submitDislike = () => {
        dispatch(likePost(post));
        setLiked(false);
    }

    return (
        <>
            {liked && (
                <img src="../../icons/heart-filled.svg" onClick={submitDislike} alt="like" />
            )}
 
            {liked === false &&  (
                <img src="../../icons/heart.svg" onClick={submitLike} alt="like" />
            )}

            <ul id="likes-list">
                {likes.length > 0 && likes.map((like) => {
                        if(like.postId === post) return <li key={like.id}>{users.length > 0 && users.map((user) => {
                            if(user.id === like.userId) return user.prenom + ' ' + user.nom;
                            else return null;
                        })}</li>
                        else return null;
                    })
                }
            </ul>
            <div id="likes-counter">
            {likesList.length}
            </div>
        </>
    )
}

export default LikeButton;