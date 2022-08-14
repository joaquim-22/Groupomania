import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLikes, likePost } from "../actions/postActions";
import '../styles/likeButton.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Link } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const LikeButton = ({ post }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const likes = useSelector((state) => state.likesReducer);
    const user = useSelector((state) => state.userReducer);
    const users = useSelector((state) => state.usersReducer);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
            <Grid container alignItems={'center'}>
                {liked && (
                    <img src="../../icons/heart-filled.svg" onClick={submitDislike} alt="like" />
                )}
    
                {liked === false &&  (
                    <img src="../../icons/heart.svg" onClick={submitLike} alt="like" />
                )}
                <Typography onClick={handleOpen} >{likesList.length}</Typography>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
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
                    </Box>
                </Modal>
            </Grid>
        </>
    )
}

export default LikeButton;