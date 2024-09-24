import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import src from "../img/Free Vector _ Unboxing concept illustration.jpeg";
import '../styles/tailwind.css';


export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (role === "student") {
          navigate('/home'); // Redirect to student dashboard
        } else if (role === "faculty") {
          navigate('/faculty'); // Redirect to faculty dashboard
        }
      } else {
        alert(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="background">
      <div className='img'>
        <img src={src} alt="Login Illustration" />
      </div>
      <div className="login">
        <form onSubmit={handleLogin}>
          <h3>Login Here</h3>

          <label htmlFor="role">Enter As</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log In</button>
          <div className="new">
            <p>Don't have an account?</p>
            <Link to="/studentcreate">
              <p>Student Register <FontAwesomeIcon icon={faArrowRight} /></p>
            </Link>
            <Link to="/facultycreate">
              <p>Faculty Register <FontAwesomeIcon icon={faArrowRight} /></p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
