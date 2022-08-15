import React, {useState} from "react";
import axios from "axios";
import { Alert, Box, Button, Grid, Snackbar, TextField } from "@mui/material";

const RegisterForm = () => {

    const [formSubmit, setFormSubmit] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
  
    const handleRegister = async (e) => {
        e.preventDefault();
        await axios({
          method: "post",
          url: `http://localhost:3050/api/user/register`,
          data: {
            nom,
            prenom,
            dateNaissance,
            department,
            email,
            password
          }
        })
          .then((res) => {
              setFormSubmit(true);
              onSucess(res.data.success);
          })
          .catch((res) => onError(res.response.data.error))
    }

    const onSucess = (success) => {
      setMsg(success)
      setOpenSuccess(true);
    }    
    
    const onError = (error) => {
      setMsg(error)
      setOpen(true);
    }
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false) || setOpenSuccess(false);
    };

    return (
      <>
        <Grid>
          <form action="" onSubmit={handleRegister}>
            <Box>
              <label>Nom</label>
              <TextField fullWidth type="text" onChange={(e) => setNom(e.target.value)} value={nom}/>
            </Box>
            <Box>
              <label>Prénom</label>
              <TextField fullWidth type="text" onChange={(e) => setPrenom(e.target.value)} value={prenom}/>
            </Box>
            <Box>
              <label>Date Naissance</label>
              <TextField fullWidth type="date" onChange={(e) => setDateNaissance(e.target.value)} value={dateNaissance}/>
            </Box>
            <Box>
              <label>Email</label>
              <TextField fullWidth type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </Box>
            <Box>
              <label>Mot de pass</label>
              <TextField fullWidth type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </Box>
            <Box>
              <label>Départment</label>
              <TextField fullWidth type="text" onChange={(e) => setDepartment(e.target.value)} value={department}/>
            </Box>
            <Button variant="contained" fullWidth type="submit">Créer compte</Button>
          </form>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
      </>
    )
}

export default RegisterForm;
