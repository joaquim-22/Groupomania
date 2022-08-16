import React, {useState} from 'react';
import axios from "axios";
import { Alert, Box, Button, Grid, Snackbar, TextField, Typography,} from '@mui/material';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
  const handleLogin = async (e) => {
      e.preventDefault()
      await axios({
        method: "post",
        url: `http://localhost:3050/api/user/login`,
        withCredentials: true,
        data: {
          email,
          password
        },
      })
      .then(() => {
        window.location="/feed"
      })
      .catch((res) => {
        onError(res.response.data.error)
      })
  }
  
  const onError = (error) => {
    setMsg(error)
    handleClick()
  }

    return (
      <>
        <form action="" onSubmit={handleLogin}>
          <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Typography>Email</Typography>
                <TextField error={email === ""} fullWidth type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
              </Grid>
              <Grid item xs={12}>
                <Typography>Mot de pass</Typography>
                <TextField error={password === ""} fullWidth type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" style={{ height: "50px", fontSize: 20}} fullWidth type="submit" value="Login">Login</Button>
              </Grid>
          </Grid>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
      </>
    )
}

export default LoginForm;