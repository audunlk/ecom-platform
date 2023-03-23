import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../services/userhandeling";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleForm = async (e: any) => {
    e.preventDefault();
    const user = { email, password };
    const isValid = isEmailValid && isPasswordValid
    if(isValid){
      const { token, error } = await registerUser(user);
      if (token) {
        localStorage.setItem("token", token);
        history.push("/");
      } else {
        alert(error);
      }
    }
  };

  const isEmailValid = email.trim().length > 0
  const isPasswordValid = password.length > 0

  const emailInputStyles = {
    border: isEmailValid ? '1px solid #ccc' : '1px solid red'
  }
   
  const passwordInputStyles = {
    border: isPasswordValid ? '1px solid #ccc' : '1px solid red'
  }

  return (
    <div className="register-container">
      <div className="register-item">
        <h1>Register</h1>
        <form onSubmit={handleForm}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="off"
            autoCapitalize="off"
            style={emailInputStyles}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            style={passwordInputStyles}
          />
          <button className="btn">Register</button>
          <p>
            Already a user?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
