import React from 'react';
import { NavLink } from "react-router-dom";
import Logout from '../components/Logout';
import '../styles/navBar.css'

const NavBar = () => {

    return (
    <div className='container-navbar'>
        <ul>
            <NavLink to="/feed">Accueil</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/">Créer Post</NavLink>
        </ul>
        <Logout/>
    </div>
    )
}

export default NavBar;