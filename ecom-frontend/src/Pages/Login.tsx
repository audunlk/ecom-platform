import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../services/userhandeling";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("ecom-token");
    console.log({token})
    console.log("token")
    if (token) {
      history.push("/");
    }
  }, [history]);

  //login and set token
  const login = async (e: any) => {
    e.preventDefault();
    const user = { email, password };
    const token = await loginUser(user);
    console.log(token);
    if (token) {
      localStorage.setItem("token", token);
      history.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="register-container">
      <div className="register-item">
        <h1>Log in</h1>
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoCapitalize="off"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            autoCapitalize="off"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn">Login</button>
          <p>
            Not a user?
            <Link to="/register"> SignUp</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
