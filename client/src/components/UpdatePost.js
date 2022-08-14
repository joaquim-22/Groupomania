import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { updatePost } from "../actions/postActions";

const UpdatePost = ({post}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newContent, setNewContent] = useState("");
    const updateQuote = () => dispatch(updatePost(post.id, newContent));

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
        <DialogTitle>Update publication</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={(e) => setNewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateQuote}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdatePost;