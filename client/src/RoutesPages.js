import React from "react";
import {Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Feed from './pages/Feed';
import AdminView from "./admin/AdminView";

const RoutesPages = () => {
    return (
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/feed' element={<Feed/>}/>
          <Route path='/admin/*' element={<AdminView/>}/>
        </Routes>
      </div>
    );
};

export default RoutesPages;