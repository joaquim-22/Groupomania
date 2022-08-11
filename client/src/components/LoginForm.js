import React, {useState} from 'react';
import axios from "axios";
import '../styles/loginForm.css'

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async (e) => {
      e.preventDefault()
        await axios({
          method: "post",
          url: `http://localhost:3050/api/user/login`,
          withCredentials: true,
          data: {
            email,
            password
          },
        })
          .then((res) => {
            window.location = '/feed'
          })
          .catch((err) => console.log(err))
    }

    return (
      <>
        <div className="container-login">
          <form action="" onSubmit={handleLogin} className="formLogin">
            <div className="formLabelsLogin">
              <label>Email</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="formLabelsLogin">
              <label>Mot de pass</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <button type="submit" value="Login" className="submitButtonLogin">Login</button>
          </form>
        </div>
      </>
    )
}

export default LoginForm;