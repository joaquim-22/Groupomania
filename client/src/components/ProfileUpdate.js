import { Alert, Avatar, Box, Button, Grid, Input, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userActions";

const ProfileUpdate = ({user}) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [department, setDepartment] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [msg, setMsg] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleUpdate = (e) => {
    
    e.preventDefault()
    const userId = user.id
    
    axios(`http://localhost:3050/api/user/update/${userId}`, {
      method: "PUT",
      data: { nom, prenom, dateNaissance, department },
      withCredentials: true
    })
    .then((res) => {
      setUpdateForm(false);
      onSucess(res.data.success);
    })
    .catch((res) => onError(res.response.data.error));
  }

  const handleDelete = () => {
    const userId = user.id;
    axios({
        method: "DELETE",
        url: `http://localhost:3050/api/user/delete/${userId}`,
        withCredentials: true
    })
    .then((res) => {
        return window.location = '/'
    })
    .catch((err) => console.log('----------------------------------------',err))
  }

  const handleSubmit = async () => {
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await axios
    .put('http://localhost:3050/api/user/upload', formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    })
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  //SnackBar
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
    <>
      <form onSubmit={handleSubmit} className="avatar-update">
        <Grid container justifyContent={'space-around'}>
          {image.preview && <img src={image.preview} alt="Avatar Preview" width='100' height='100' />}
          <Avatar src={"http://localhost:3050/Images/" + user.profilImage} alt="user" sx={{ width: 100, height: 100 }}/>
          <Input type='file' name='file' onChange={handleFileChange}></Input>
        </Grid>
        <Box py={3}>
          <Button fullWidth variant='outlined' type='submit'>Submit</Button>
        </Box>
      </form>
      <form action="" onSubmit={handleUpdate}>
        <Box mb={3}>
          <Typography>Nom</Typography>
          <TextField fullWidth placeholder={user.nom}
            type="text"
            onChange={(e) => setNom(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Typography>Prénom</Typography>
          <TextField fullWidth placeholder={user.prenom}
            type="text"
            onChange={(e) => setPrenom(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Typography>Date Naissance</Typography>
          <TextField fullWidth placeholder={user.dateNaissance}
            type="date"
            onChange={(e) => setDateNaissance(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Typography>Départment</Typography>
          <TextField fullWidth placeholder={user.department}
            type="select"
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Box>
        <Button fullWidth variant='outlined' type="submit">Update</Button>
      </form>
      <Box py={3}>
        <Button variant='outlined' fullWidth color={'error'} onClick={handleDelete}>Delete</Button>
      </Box>
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
    </>
  );
};

export default ProfileUpdate;
