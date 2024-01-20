import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        idUser: email,
        password,
      });

      if (response.data.message === "Login successful") {
        navigate("/quiz");
      } else {
        setErr(true);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Login</span>
        <span className="title"></span>
       
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/Register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
