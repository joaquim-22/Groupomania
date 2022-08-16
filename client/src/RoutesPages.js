import React, { useContext } from "react";
import {Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Feed from './pages/Feed';
import AdminView from "./admin/AdminView";
import { useSelector } from "react-redux";
import { UidContext } from "./components/AppContext";
import PrivateRoute from "./PrivateRoute";
import ProfileUsers from './components/ProfileUsers'

const RoutesPages = () => {

  const uid = useContext(UidContext);
  const user = useSelector((state) => state.userReducer);

    return (
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/feed" element={<Feed user={user}/>} />
          <Route path='/profile' element={<Profile user={user}/>}/>
          <Route path='/profile/:id' element={<ProfileUsers/>}/>
        </Route>
        {<Route path='/admin/*' element={(uid && user.isAdmin === true) ? <AdminView/> : <Navigate to="/"/>}/>}
      </Routes>
    );
};

export default RoutesPages;