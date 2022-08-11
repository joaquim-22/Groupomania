import React, {useEffect, useState} from "react";
import RoutesPages from './RoutesPages'
import './App.css'
import {UidContext} from './components/AppContext';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {getUser} from './actions/userActions'

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch();

  useEffect( () => {
    const fetchTok = async () => {
      await axios({
        method:"get",
        url: "http://localhost:3050/jwtid",
        withCredentials: true,
      })
      .then((res) => {
        setUid(res.data)
      })
      .catch((err) => console.log('No token fETCHeRROR'));
    }
    fetchTok();

    if(uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <RoutesPages />
    </UidContext.Provider>
  )
}

export default App;
