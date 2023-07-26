import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";

import { setUser, setIsLoggedIn, setLoading, setError, selectUser, updateAddress, updateNumber } from '../../features/userSlice';
import { Toaster, toast } from 'sonner'
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { updatePassword } from 'firebase/auth';

const Profile = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('janedoe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [profilePicture, setProfilePicture] = useState('https://th.bing.com/th?id=OIP.8n06bZdLhzh-CqZOPsJFAQAAAA&w=220&h=284&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2');
  const [totalOrders, setTotalOrders] = useState(10);
  const [password, setPassword] = useState('password123');
  const [changedpassword, setchangedPassword] = useState('password123');
  const [editMode, setEditMode] = useState(false);
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [pic, setPic] = useState('');
  const [num,setnum]=useState(101);
  useEffect(() => {
    const mail = localStorage.getItem("mail");
    console.log("mail", mail)
    axios.post("http://localhost:3001/getuser", { mail }).then(
      (res) => {
        const user = res.data;
        console.log(user)
        setEmail(user.email)
     
        setPhone(user.number)
       
        
        setPhone(user.number)
        setName(user.displayName)
        setTotalOrders(user.address)
        if(user.password!==undefined)
        setPassword(user.password)
        else
        setPassword("")
        if (user.profile !== undefined) setPic(user.profile)

        user.profile == undefined && setPic("https://img.freepik.com/free-vector/cheerful-cute-girl-character-hand-drawn-cartoon-art-illustration_56104-968.jpg?w=2000")
      })
  }, [])
  const firebaseConfig = {
    apiKey: "AIzaSyBlM7dACgX8QSRPU8PsZe7UVtvTqD4saeY",
    authDomain: "ecommerce-e81ca.firebaseapp.com",
    projectId: "ecommerce-e81ca",
    storageBucket: "ecommerce-e81ca.appspot.com",
    messagingSenderId: "518888859936",
    appId: "1:518888859936:web:39d1cacdc4abbbf37e0f45",
    measurementId: "G-QS80JQYRL6",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const handleEdit = () => {
    setEditMode(true);
  };
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;

    // if (value.length !== 0 && (value.length >= 10 && /^\d*$/.test(value))) {
    //   setnum(value);
    //   console.log(num.length)
    // }
    setnum(value);
    if(value)
    console.log(num?.length)
  };
  const handleSave = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
  
    dispatch(updateAddress(totalOrders));

    dispatch(updateNumber(phone));
    if (confirmPassword == "" && num!==101) {
      if(num?.length!==10){
        toast.error("Please enter a valid number");
        return;
      }
      axios
        .post("http://localhost:3001/signupnumber", {
          
          number: num,
        
        })
        .then((res) => { if(res.data=="already exist") {toast(res.data); return; }
        })
        .catch((error) => {
          // Handle sign up errors

          toast(error.message);
          return;
        });
      axios.post("http://localhost:3001/updateuser", { email, number: num, displayName: name, address: totalOrders, profile: pic }).then(
        (res) => {
          console.log(res)
        })

    }
    else if(num==101 && confirmPassword == ""){
      axios.post("http://localhost:3001/updateuser", { email, displayName: name, address: totalOrders,  profile: pic }).then(
        (res) => {
          console.log(res)
        })}
        else if(num==101 && confirmPassword == ""){
          axios.post("http://localhost:3001/updateuser", { email, displayName: name, address: totalOrders,  profile: pic,password:confirmPassword }).then(
            (res) => {
              console.log(res)
            })}
            else{
              axios.post("http://localhost:3001/updateuser", { email,number: num, displayName: name, address: totalOrders,  profile: pic,password:confirmPassword }).then(
                (res) => {
                  console.log(res)
                })
            }
      setCurrentPassword('');
    
    setEditMode(false);
    window.location.reload();
  };
  function handleUpload(file) {

    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //   setImages((img) => {
          //     return [...img, url];
          //   });
          setPic(url);

          console.log("Hello");
        });
      }
    );
  }
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    handleUpload(file)
  };
  const navigate = useNavigate();
  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSave = () => {
    if (currentPassword === password) {
      setPasswordAlert(false);
      setPasswordChangeMode(true);
    } else {
      setPasswordAlert(true);
    }
  };

  useEffect(() => {
    if (passwordChangeMode) {
      setShowPasswordModal(false);
    }
  }, [passwordChangeMode]);

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setCurrentPassword('');
    setPasswordAlert(false);
  };

  const handleConfirmPasswordSave = () => {
    // Perform password change logic here
    if (confirmPassword?.trim().length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }
    console.log(confirmPassword)
    setPasswordChangeMode(false);
    console.log(setConfirmPassword)
  };

  return (
    <div>
      <Toaster />
      <div className="profile">
        <div className="profile-picture">

          {!editMode ? (
            <img src={pic} alt="Profile" />
          ) : (
            <div className="profile-picture-edit">
              <img src={pic} alt="add profile pic" />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>
          )}
          <div>
            <button className="backhome" onClick={() => { navigate(-1) }}>back to home</button></div>
        </div>
        <div className="profile-info">
          <div className="profile-header">
            <h2>Profile</h2>
            {!editMode && (
              <button onClick={handleEdit} className="edit-button">
                Edit
              </button>
            )}
          </div>
          <div className="profile-details">
            <div className="profile-row">
              <label>Name:</label>
              {!editMode ? (
                <span>{name}</span>
              ) : (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
            </div>
            <div className="profile-row">
              <label>Email:</label>
              {!editMode ? (
                <span>{email}</span>
              ) : (
                <input
                  type="email"
                  value={email}
                  readOnly
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </div>
            {phone!==undefined && <div className="profile-row">
              <label>Phone:</label>
              {!editMode ? (
                <span>{phone}</span>
              ) : (
                <input
                  type="number"
                  value={phone}
                 disabled
                 
                  style={{ width: "100%" }}
                  placeholder="Number"
                  // min={1000000000}
                  maxLength={10}
                  minLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              )}
            </div>}
            {phone==undefined && <div className="profile-row">
              <label>Phone:</label>
              {!editMode ? (
                <span>{phone}</span>
              ) : (
                <input
                  type="number"
                 
                  onChange={handlePhoneNumberChange}
                  style={{ width: "100%" }}
                  placeholder="Number"
                  // min={1000000000}
                  max={9999999999}
                maxLength="10"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              )}
            </div>}
            <div className="profile-row">
              <label>Address:</label>
              {!editMode ? (
                <span>{totalOrders}</span>
              ) : (
                <input
                  type="text"
                  value={totalOrders}
                  onChange={(e) => setTotalOrders(e.target.value)}
                />
              )}
            </div>
            {passwordChangeMode ? (
              <>
                <div className="profile-row">

                </div>
                <div className="profile-row">
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); console.log(confirmPassword) }}
                  />
                </div>
                <button onClick={handleConfirmPasswordSave} className="save-button">
                  Save Password
                </button>
              </>
            ) : (
              <div className="profile-row">
                <label>Password:</label>
                {!editMode ? (
                  <span>******</span>
                ) : (
                  <button onClick={handlePasswordChange} className="change-button">
                    Change Password
                  </button>
                )}
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          )}
        </div>
        {showPasswordModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Change Password</h3>
              <div className="modal-row">
                <label>Previous Password:</label>
                <input
              placeholder='leave empty if no password'
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              {passwordAlert && <p className="password-alert">Previous password is incorrect.</p>}
              <div className="modal-actions">
                <button onClick={handlePasswordSave} className="modal-button">
                  Save
                </button>
                <button onClick={handleCloseModal} className="modal-button">
                  Cancel
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
