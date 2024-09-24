import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faUpload, faRankingStar, faMessage, faRightFromBracket, faUser, faCog, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="w-full sm:w-80 bg-gray-800 text-white h-full p-6 flex flex-col">
  {/* Greeting Section */}
  <div className="mb-12 p-4 bg-gray-700 rounded-lg sm:mb-12">
    <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-2 font-mono">
      BITLEARN™
    </h2>
  </div>

  {/* Menu Items */}
  <div className="text-lg sm:text-xl font-normal space-y-6 sm:space-y-8">
    <Link to="/home" className="block p-3 bg-gray-700 rounded-lg hover:bg-blue-500 transition duration-200">
      <FontAwesomeIcon icon={faBorderAll} className="mr-2" /> Dashboard
    </Link>
    <Link to="/upload" className="block p-3 bg-gray-700 rounded-lg hover:bg-blue-500 transition duration-200">
      <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload
    </Link>
    <Link to="/rank" className="block p-3 bg-gray-700 rounded-lg hover:bg-blue-500 transition duration-200">
      <FontAwesomeIcon icon={faRankingStar} className="mr-2" /> Ranking
    </Link>
    <Link to="/chat" className="block p-3 bg-gray-700 rounded-lg hover:bg-blue-500 transition duration-200">
      <FontAwesomeIcon icon={faMessage} className="mr-2" /> Message
    </Link>
    {/* <Link to="/profile" className="block p-3 bg-gray-700 rounded-lg hover:bg-blue-500 transition duration-200">
      <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
    </Link>
    <Link to="/settings" className="block p-3 bg-gray-700 rounded-lg hover:bg-blue-500 transition duration-200">
      <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
    </Link>
    <Link to="/contact" className="block p-3 bg-gray-700 rounded-lg hover:bg-blue-500 transition duration-200">
      <FontAwesomeIcon icon={faAddressBook} className="mr-2" /> Contact
    </Link> */}
  </div>

  {/* Logout Button */}
  <p 
    onClick={handleLogout} 
    className="mt-auto block text-lg sm:text-xl  p-3 bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer transition duration-200"
    aria-label="Logout"
  >
    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" /> Logout
  </p>
</div>

  );
}
