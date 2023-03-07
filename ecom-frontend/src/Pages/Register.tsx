import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../services/userhandeling";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();


       const handleForm = async (e: any) => {
        const input = document.querySelectorAll('input')
            for(let i = 0; i < input.length; i++) {
                if(input[i].value.trim() === '') {
                    input[i].style.border = "1px solid red"
                }
            }
        e.preventDefault()
        const user = { email, password }
        const {token, error} = await registerUser(user)
        if (token) {
            localStorage.setItem('token', token)
            history.push('/')
        }
        else {
            alert(error)
        }

    

    }
    

  return (
    <div className="register-container">
      <div className="register-item">
        <h1>Register</h1>
        <form
        onSubmit={handleForm}
        >
          <input
          className="input"
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="off"
            autoCapitalize="off"
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
          />
          <button className="btn"
          >Register</button>
          <p>
            Already a user?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
