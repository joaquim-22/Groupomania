import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userActions";
import '../styles/profileUpdate.css'

const ProfileUpdate = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [department, setDepartment] = useState("");
  const [setUpdateForm] = useState(false);
  const user = useSelector((state) => state.userReducer)
  const dispatch = useDispatch();
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

  const handleUpdate = () => {

    dispatch(
      updateUser(
        nom,
        prenom,
        dateNaissance,
        department
      )
    );
    setUpdateForm(false);
  };

  const handleSubmit = async () => {
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await axios
    .put('http://localhost:3050/api/user/upload', formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    })
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (
    <div className="container-profile-update">
      <div className="form-update-container">
        <form onSubmit={handleSubmit} className="avatar-update">
          {image.preview && <img src={image.preview} alt="Avatar Preview" width='100' height='100' />}
          <img src={"http://localhost:3050/Images/" + user.profilImage} alt="user" id="avatar-update-image"/>
          <input type='file' name='file' onChange={handleFileChange}></input>
          <button type='submit'>Submit</button>
        </form>
        <form action="" onSubmit={handleUpdate} className="formInscription">
          <div className="formLabels formLabelsUpdate">
            <div className="description-input-update">
                <label>Nom</label>
                <span>{user.nom}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="formLabels formLabelsUpdate">
            <div className="description-input-update">
                <label>Prénom</label>
                <span>{user.prenom}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
          <div className="formLabels formLabelsUpdate">
            <div className="description-input-update">
                <label>Date Naissance</label>
                <span>{user.dateNaissance}</span>
            </div>
            <input
              type="date"
              onChange={(e) => setDateNaissance(e.target.value)}
            />
          </div>
          <div className="formLabels formLabelsUpdate">
            <div className="description-input-update">
                <label>Départment</label>
                <span>{user.department}</span>
            </div>
            <input
              type="text"
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <button type="submit" value="Update" className="submitButton">Update</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
