import React, { useState } from 'react';
import img from "../img/student.gif";

export default function StudentCreate() {
  const [formData, setFormData] = useState({
    firstName: '',
    department: '',
    batch: '',
    email: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Registration successful!');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white p-4 lg:p-0">
      {/* Image on the left */}
      <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
        <img 
          src={img} 
          alt="Illustration" 
          className="w-full max-w-md lg:max-w-lg" 
          style={{ height: 'auto' }} 
        />
      </div>

      {/* Form on the right */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition duration-300 hover:scale-105">
          <header className="text-2xl font-bold text-center text-gray-800 mb-8">Register Here</header>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Name..."
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Department..."
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Batch</label>
              <input
                type="number"
                name="batch"
                placeholder="Batch..."
                value={formData.batch}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email..."
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password..."
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="block w-52 py-2 mx-auto bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
