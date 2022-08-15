import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from "../actions/postActions";
import UpdateComment from './UpdateComment';
import { Avatar, CardContent, CardHeader, Grid, Typography, Card } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

const CommentsCard = ({ comment, user, users }) => {

    const dispatch = useDispatch();
    const deleteComments = () => dispatch(deleteComment(comment.id));
    
    const convertDateForHuman = (createdAt) => {
        let converted = new Date(createdAt);
        return converted.toLocaleString();
    }

    return (
        <Card>
            <CardHeader
                    avatar={users &&
                            users.map((user) => {
                                return (user.profilImage !== null && user.id === comment.userId) ? <Avatar src={"http://localhost:3050/Images/" + user.profilImage} alt="user" key={user.id}/>
                                : null
                        })}
                    action={
                        <Grid container>
                            {(user.id === comment.userId) ? 
                                <UpdateComment comment={comment}/>
                            : null}

                            {(user.id === comment.userId ) ? 
                                <IconButton onClick={deleteComments}>
                                    <ClearIcon sx={{ color: 'red' }}/>
                                </IconButton>
                            : null}
                        </Grid>
                    }
                    title={users &&
                            users.map((user) => {
                                if (user.id === comment.userId) return user.prenom + ' ' + user.nom
                                else return null;
                            })
                            .join("")
                        }
                    subheader={convertDateForHuman(comment.createdAt).slice(0, -3)}
                />
                <CardContent>
                    <Typography>{comment.content}</Typography>
                </CardContent>
        </Card>
    )
}

export default CommentsCard;