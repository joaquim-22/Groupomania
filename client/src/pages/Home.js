import React, { useContext } from "react";
import Logo from "../components/Logo";
import HomeImage from "../assets/groupomaniaHomeImage.svg";
import "../styles/home.css";
import MenuHome from "../components/MenuHome";
import {UidContext} from '../components/AppContext'

const Home = () => {

  const uid = useContext(UidContext)

  return (
    <div className="home">
      <div className="homepageImage">
        <img src={HomeImage} alt="Groupomania"></img>
      </div>
      <Logo />
      <h3 className="slogan">Un nouveau monde se lève. Découvrons-le.</h3>
        <div className="toggle-container">
          {uid ? (
            window.location = "/feed"
          ) : (
            <div className="log-container">
              <MenuHome RegisterForm={false} LoginForm={true} />
            </div>
          )}
      </div>
    </div>
  );
};

export default Home;
