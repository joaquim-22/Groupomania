import React, { useContext } from "react";
import {Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Feed from './pages/Feed';
import AdminView from "./admin/AdminView";
import { useSelector } from "react-redux";
import { UidContext } from "./components/AppContext";

const RoutesPages = () => {

  const uid = useContext(UidContext);
  const user = useSelector((state) => state.userReducer);

    return (
      <Routes>
        <Route exact path='/' element={uid ? <Home/> : <Feed user={user}/>}/>
        <Route path='/profile' element={<Profile user={user}/>}/>
        <Route path='/feed' element={<Feed user={user}/>}/> 
        {<Route path='/admin/*' element={(uid && user.isAdmin === true) ? <AdminView/> : <Navigate to="/"/>}/>}
      </Routes>
    );
};

export default RoutesPages;

/* import React, { useContext } from "react";
import {Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Feed from './pages/Feed';
import AdminView from "./admin/AdminView";
import { UidContext } from "./components/AppContext";
import userReducer from "./reducers/userReducer";
import { useSelector } from "react-redux";

const RoutesPages = () => {

  const uid = useContext(UidContext);
  const user = useSelector((state) => state.userReducer)

    return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        {
          uid ? (
            <>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/feed' element={<Feed/>}/>
            </>
          ) : null
        }

        {
          (uid && user.isAdmin === true) ? (
            <>
              <Route path='/admin/*' element={<AdminView/>}/>
            </>
          ) : null
        }
      </Routes>
    );
};

export default RoutesPages; */