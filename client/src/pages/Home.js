import React from "react";
import Logo from "../components/Logo";
import HomeImage from "../assets/groupomaniaHomeImage.svg";
import "../styles/home.css";
import MenuHome from "../components/MenuHome";
import { UidContext } from "../components/AppContext";
import { Typography } from "@mui/material";

const Home = () => {

  return (
    <div className="home">
      <div className="homepageImage">
        <img src={HomeImage} alt="Groupomania"></img>
      </div>
      <Logo />
      <Typography>Un nouveau monde se lève. Découvrons-le.</Typography>
        <div className="toggle-container">
            <div className="log-container">
              <MenuHome RegisterForm={false} LoginForm={true} />
            </div>
      </div>
    </div>
  );
};

export default Home;
