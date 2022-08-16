import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { updatePost } from "../actions/postActions";
import { Alert, Snackbar } from '@mui/material';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const UpdatePost = ({post}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newContent, setNewContent] = useState("");
    const updateQuote = () => dispatch(updatePost(post.id, newContent));
    const [msg, setMsg] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const [openSnackSuccess, setOpenSnackSuccess] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    //Snackbar Error
    const onSucess = (success) => {
      setMsg(success)
      setOpenSnackSuccess(true);
    }    
      
    const onError = (error) => {
      setMsg(error)
      setOpenSnack(true);
    }

    const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnack(false) || setOpenSnackSuccess(false);
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
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            {msg}
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackSuccess} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            {msg}
        </Alert>
      </Snackbar>
      <ToastContainer />
    </div>
  );
}

export default UpdatePost;