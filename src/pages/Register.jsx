import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        displayname: displayName,
        email,
        password,
      });

      if (response.data._id) {
        console.log("register good");
        navigate("/");
      } else {
        setErr(true);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Register</span>
        <span className="title"></span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          {/* Retirez le champ de fichier et son libellé */}
          <button disabled={loading}>Sign up</button>
        </form>
        <p>
          You do have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
