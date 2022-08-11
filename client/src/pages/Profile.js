import React from 'react';
import '../styles/profile.css';
import Logo from '../components/Logo';
import NavBar from '../components/NavBar';
import { useSelector } from "react-redux";
import ProfileUpdate from '../components/ProfileUpdate';
import axios from 'axios';

const Profile = () => {
    const user = useSelector((state) => state.userReducer)

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

    return (
        <div className='main-container-profile'>
            <Logo/>
            <NavBar/>
            <div className='bienvenue-container'>
                <h2>Bienvenue {user.prenom}</h2>
            </div>
            <div className='container-update'>
                <ProfileUpdate/>
            </div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Profile;