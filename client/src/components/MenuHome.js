import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import '../styles/menuHome.css'

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
      <div className="container-menu-home">
          <button onClick={handleModals} id="register" className={registerModal ? "active-btn" : null}>S'inscrire</button>
          <button onClick={handleModals} id="login" className={loginModal ? "active-btn" : null}>Se connecter</button>
        {registerModal && <RegisterForm />}
        {loginModal && <LoginForm />}
      </div>
    </div>
  );
};

export default MenuHome;