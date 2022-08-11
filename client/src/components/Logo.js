import React from 'react'
import '../styles/logo.css'
import logoGroupomania from '../assets/logo.svg'

const Logo = () => {
    return (
        <div className='logo'>
            <img src={logoGroupomania} alt='Logo Groupomania'></img>
        </div>
    )
}

export default Logo;