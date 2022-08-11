import React, {useState} from "react";
import '../styles/registerForm.css';
import axios from "axios";

const RegisterForm = () => {

    const [setFormSubmit] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
  
    const handleRegister = async () => {
        await axios({
          method: "post",
          url: `http://localhost:3050/api/user/register`,
          data: {
            nom,
            prenom,
            dateNaissance,
            department,
            email,
            password
          }
        })
          .then((res) => {
              setFormSubmit(true);
          })
          .catch((err) => console.log(err))
    }

    return (
      <>
        <div className="container-inscription">
          <h1>Inscription</h1>
          <form action="" onSubmit={handleRegister} className="formInscription">
            <div className="formLabels">
              <label>Nom</label>
              <input type="text" onChange={(e) => setNom(e.target.value)} value={nom}/>
            </div>
            <div className="formLabels">
              <label>Prénom</label>
              <input type="text" onChange={(e) => setPrenom(e.target.value)} value={prenom}/>
            </div>
            <div className="formLabels">
              <label>Date Naissance</label>
              <input type="date" onChange={(e) => setDateNaissance(e.target.value)} value={dateNaissance}/>
            </div>
            <div className="formLabels">
              <label>Email</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="formLabels">
              <label>Mot de pass</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div className="formLabels">
              <label>Départment</label>
              <input type="text" onChange={(e) => setDepartment(e.target.value)} value={department}/>
            </div>
            <input type="submit" value="Créer Compte" className="submitButton"/>
          </form>
        </div>
      </>
    )
}

export default RegisterForm;
