import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import src from "../img/education.gif";
import '../styles/tailwind.css';

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://bit-notes-backend.onrender.com/users/login', {
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
          navigate('/home');
        } else if (role === "faculty") {
          navigate('/faculty');
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
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white p-4 lg:p-0">
      {/* Image on the left */}
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
  <img 
    src={src} 
    alt="Login Illustration" 
    className="w-full max-w-3xl lg:max-w-4xl rounded-lg " 
    style={{ height: '600px', objectFit: 'cover' }} 
  />
</div>


      {/* Form on the right */}
      <div className="w-full lg:w-1/2 flex justify-center">
      {/* transform transition duration-300 hover:scale-105 */}
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg "> 
          <header className="text-2xl font-bold text-center text-gray-800 mb-8">Login Here</header>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              className="block w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Log In
            </button>

            <div className="text-center">
              <p className="text-sm">Don't have an account?</p>
              <Link to="/studentcreate" className="text-indigo-600 hover:underline">
                Student Register <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <br />
              <Link to="/facultycreate" className="text-indigo-600 hover:underline">
                Faculty Register <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
