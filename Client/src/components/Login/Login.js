import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "./Login.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCredential } from "firebase/auth";
import { Toaster, toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setIsLoggedIn,
  setLoading,
  setError,
  selectUser,
} from "../../features/userSlice";
// Initialize Firebase with your project's configuration
const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.trim();

    if (value.length === 0 || (value.length <= 10 && /^\d*$/.test(value))) {
      setPhoneNumber(value);
    }
  };

  const handleSignUpWithEmail = (e) => {
    e.preventDefault();
    if (email == "") {
      toast("enter email");
      return;
    }
    if (password == "") {
      toast("enter password");
      return;
    }
    localStorage.setItem("mail", email);

    axios
      .post("http://localhost:3001/userlogin", { email, password })
      .then((res) => {
        const checkrole = res.data.role;
        console.log(res.data);
        const userData = res.data;
        // const dispatch = useDispatch();
        dispatch(setUser(userData));

        if (res.data == "password not correct") {
          toast.error(res.data);
          navigate("/login");
        } else if (res.data.disable == "true")
          toast.error("sorry account is dis-abled");
        else if (checkrole == "vendor") {
          localStorage.setItem("loggedin", true);
          dispatch(setIsLoggedIn("true"));
          navigate("/vendor");
          console.log("navigate v");
        } else if (checkrole == "customer") {
          localStorage.setItem("loggedin", true);
          dispatch(setIsLoggedIn("true"));
          navigate("/customer");
          console.log("navigate c");
          dispatch(setIsLoggedIn("true"));
        } else if (checkrole == "admin") {
          localStorage.setItem("loggedin", true);
          dispatch(setIsLoggedIn("true"));
          navigate("/admin");
          dispatch(setIsLoggedIn("true"));
        } else {
          toast.error("account not found");
        }
      })
      .catch((error) => {
        // Handle sign up errors
        toast.error(error.message);
      });
  };

  const handleSignUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    dispatch(setIsLoggedIn(true));
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((userCredential) => {
        // Sign up successful, access the user data with: userCredential.user
        localStorage.setItem("mail", userCredential.user.email);
        axios
          .post("http://localhost:3001/userloginwithgoogle", {
            email: userCredential.user.email,
          })
          .then((res) => {
            const checkrole = res.data.role;
            console.log(res.data);
            const userData = res.data;
            // const dispatch = useDispatch();
            dispatch(setUser(userData));
            console.log(userData);

            localStorage.setItem("loggedin", "true");
            if (checkrole == "vendor") navigate("/vendor");
            else if (checkrole == "customer") navigate("/customer");
            else toast.error("account not found");
          })
          .catch((error) => {
            // Handle sign up errors
            toast.error("Error signing in Google:", error.message);
          });
      })
      .catch((error) => {
        // Handle sign up errors
        toast.error("Error signing up with Google:", error.message);
      });
  };

  const handleSignUpWithPhoneNumber = (e) => {
    e.preventDefault();
    localStorage.setItem("mail", email);

    localStorage.setItem("loggedin", "true");
    const phoneNumberWithCountryCode = `+91${phoneNumber}`;

    // Check if the reCAPTCHA container is already populated
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (recaptchaContainer.innerHTML !== "") {
      // reCAPTCHA has already been rendered, do nothing
      return;
    }

    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      recaptchaContainer,
      {
        size: "invisible",
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumberWithCountryCode, recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS verification code sent successfully
        const verificationCode = window.prompt(
          "Please enter the verification code sent to your phone:"
        );

        confirmationResult
          .confirm(verificationCode)
          .then((userCredential) => {
            // Sign up successful, access the user data with: userCredential.user
            localStorage.setItem("mail", email);

            localStorage.setItem("loggedin", "true");
            console.log(
              "Signing up with phone number:",
              userCredential.user,
              "Role:",
              role
            );
            // Clear the input field
            console.log(userCredential.user.phoneNumber);
            axios
              .post("http://localhost:3001/userloginwithgoogle", {
                email: userCredential.user.phoneNumber,
              })
              .then((res) => {
                const checkrole = res.data.role;
                if (checkrole == "vendor") navigate("/vendor");
                else if (checkrole == "customer") navigate("/customer");
                else toast.error("account not found");
              })
              .catch((error) => {
                // Handle sign up errors
                toast.error("Error signing in Google:", error.message);
              });
            setPhoneNumber("");
          })
          .catch((error) => {
            // Handle sign up errors
            toast.error(error.message);
          });
      })
      .catch((error) => {
        // Handle phone number sign-in errors
        console.log("Error signing in with phone number:", error.message);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Toaster />
      <div className="page-container">
        <div className="login-container">
          <div className="form-container-form">
            <form>
              <div className="pass-input">
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="Email/ Phone number"
                />
              </div>
              <div>
                <div className="pass-input">
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Password"
                  />
                </div>
              </div>

              <button className="sign-button" onClick={handleSignUpWithEmail}>
                Login
              </button>

              <button
                className="google-log-button"
                onClick={handleSignUpWithGoogle}
              >
                Login with Google
              </button>
              {/* 
              <p>OR</p>
              <div>
                <input
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter your phone Number"
                  min={1000000000}
                  max={9999999999}
                />
              </div>
              <div>
                <button className="phone-button" onClick={handleSignUpWithPhoneNumber}>
                  Login with Otp
                </button>
              </div> */}
              <div>
                <button
                  className="signup-link-button"
                  style={{ backgroundColor: "gray" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Sign up instead?
                </button>
              </div>
            </form>
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
