import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import '../styles/menuHome.css'
import { Box, Button } from "@mui/material";

const MenuHome = ( props ) => {
  const [registerModal, setRegisterModal] = useState(props.register);
  const [loginModal, setLoginModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setRegisterModal(true);
    } else if (e.target.id === "login") {
      setRegisterModal(false);
      setLoginModal(true);
    }
  };

  return (
    <div className="menu-home">
      <Box className="container-menu-home">
          <Button onClick={handleModals} id="register" className={registerModal ? "active-btn" : null}>S'inscrire</Button>
          <Button onClick={handleModals} id="login" className={loginModal ? "active-btn" : null}>Se connecter</Button>
        {registerModal && <RegisterForm />}
        {loginModal && <LoginForm />}
      </Box>
    </div>
  );
};

export default MenuHome;