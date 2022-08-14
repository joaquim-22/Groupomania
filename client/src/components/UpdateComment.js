import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { updateComment } from "../actions/postActions";

const UpdateComment = ({comment}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newCommentContent, setNewCommentContent] = useState("");
    const updateComments = () => dispatch(updateComment(comment.id, newCommentContent));


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Commentaire</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateComments}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateComment;