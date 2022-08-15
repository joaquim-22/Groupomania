import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentsCard from '../components/CommentsCard';
import LikeButton from './LikeButton';
import { deletePost, getComments} from "../actions/postActions";
import ClearIcon from '@mui/icons-material/Clear';
import UpdatePost from './UpdatePost'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { Box, TextField, CardContent, Grid, List, Modal, Button, Alert, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import axios from 'axios';


const PostCard = ({ post, user }) => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer);
    const comments = useSelector((state) => state.commentReducer);
    const [commentContent, setCommentContent] = useState("");
    const deleteQuote = () => dispatch(deletePost(post.id));
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [msg, setMsg] = useState('');
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const postId = post.id;
    let commentsList = comments.length > 0 && comments.filter(comment => comment.postId === post.id);

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

    const convertDateForHuman = (createdAt) => {
        let converted = new Date(createdAt);
        return converted.toLocaleString();
    };

    const handleComment = async () => {
        await axios({
          method: "POST",
          url:`http://localhost:3050/api/post/comments/${postId}`,
          withCredentials: true,
          data: {
            commentContent
          },
        })
        .then((res) => {
            dispatch(getComments());
            onSucess(res.data.success);
        })
        .catch((res) => {
           onError(res.response.data.error)
        })
    }

    //Snackbar Error
    const onSucess = (success) => {
        setMsg(success)
        setOpenSuccess(true);
    }    
        
    const onError = (error) => {
        setMsg(error)
        setOpenError(true);
    }

    const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenError(false) || setOpenSuccess(false);
    };

    return (
        <ListItem key={post.id}>
            <Card sx={{ width: 1 }}>
                <CardHeader
                    avatar={users.length > 0 &&
                            users.map((user) => {
                                return (user.profilImage !== null && user.id === post.userId) ? <Avatar src={"http://localhost:3050/Images/" + user.profilImage} alt="user" key={user.id}/>
                                : null
                        })}
                    action={
                        <Grid container>
                            {(user && user.id === post.userId) ? 
                                <UpdatePost post={post}/>
                            : null}

                            {(user && user.id === post.userId ) ? 
                                <IconButton onClick={deleteQuote}>
                                    <ClearIcon sx={{ color: 'red' }}/>
                                </IconButton>
                            : null}
                        </Grid>
                    }
                    title={users &&
                            users.map((user) => {
                                if (user.id === post.userId) return user.prenom + ' ' + user.nom
                                else return null;
                            })
                            .join("")
                        }
                    subheader={convertDateForHuman(post.createdAt).slice(0, -3)}
                />


                {post.image !== null ? 
                    <CardMedia
                        component="img"
                        image={"http://localhost:3050/Images/" + post.image}    
                        alt="Post Image"
                    />: null    
                }

                {post.content !== "" ?
                    (<CardContent>
                        <Typography>{post.content}</Typography>
                    </CardContent>) : null
                }

                <Button>
                    <LikeButton post={post.id} user={user} users={users}/>
                </Button>

                <IconButton onClick={handleOpen}>
                    <ModeCommentOutlinedIcon sx={{fontSize: 40}}></ModeCommentOutlinedIcon>
                    <Typography>{commentsList.length}</Typography>
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <List>
                            {
                            comments.length > 0 && comments.slice().reverse().map((comment) => {
                                if (post.id === comment.postId) return <CommentsCard comment={comment} key={comment.id} user={user} users={users}/>
                                else return null
                            })
                            }
                        </List>
                        <TextField
                            onChange={(e) => setCommentContent(e.target.value)}
                            fullWidth variant="filled" label="Ajoutez un commentaire ..."/>
                        <Button style={{backgroundColor: "#FF9292"}} fullWidth variant="contained" endIcon={<SendIcon />} onClick={handleComment}>Submit</Button>
                    </Box>
                </Modal>
                    <Grid container>
                        <TextField
                            onChange={(e) => setCommentContent(e.target.value)}
                            fullWidth variant="filled" label="Ajoutez un commentaire ..."/>
                        <Button style={{backgroundColor: "#FF9292"}} fullWidth variant="contained" endIcon={<SendIcon />} onClick={handleComment}>Submit</Button> 
                    </Grid>
            </Card>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} variant="filled" severity="success" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </ListItem>
    )
}

export default PostCard;