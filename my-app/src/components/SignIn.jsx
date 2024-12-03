// SignIn.jsx
import React, { useState } from "react";
import './SignIn.css';
import LoginFormFile from "./LoginFormFile";

const SignIn = ({ onSubmit }) => {

  return (
    <div className="sign-in-container">
        <h2>Sign In</h2>
        <div>
          <LoginFormFile />
        </div>
    </div>
  );
};

export default SignIn;
