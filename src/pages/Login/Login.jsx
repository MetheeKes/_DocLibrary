import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";

import { verifyUser } from "../../data/users";

import "./Login.css";
function Login({ setToken }) {
  const userRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="background-1">
        <div className="login-page">
          <div className="login-container">
            <div className="login-box">
              <h2 className="login-title">Sign in</h2>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                placeholder="user"
                ref={userRef}
              />
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="pass"
                ref={passRef}
              />

              <button
                type="submit"
                className="login-button"
                onClick={() => {
                  const user = userRef.current.value.trim();
                  const pass = passRef.current.value.trim();
                  userRef.current.value = "";
                  passRef.current.value = "";
                  const userInfo = verifyUser(user, pass)
                  if (userInfo === null) {
                    alert("Wrong username or password");
                    userRef.current.focus();
                  } else {
                    setToken(userInfo.token);
                    navigate('/upload');
                  }
                }}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
