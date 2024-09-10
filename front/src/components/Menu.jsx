import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faUpload, faRankingStar, faMessage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className='menu'>
      <div className='name'>
        <h2>Hi, 👋</h2>
      </div>
       
      <div className='mai-menu'>
      <Link to="/home"> <p><FontAwesomeIcon icon={faBorderAll} />Dashboard</p></Link>
        <Link to="/upload"> <p><FontAwesomeIcon icon={faUpload} />Upload</p></Link>
        <Link to="/rank">   <p><FontAwesomeIcon icon={faRankingStar} />Ranking</p></Link>
        <Link to="/chat"> <p><FontAwesomeIcon icon={faMessage} />Message</p></Link>
        <br/><br/><br/>
        <p onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} />Logout</p>
      </div>
    </div>
  );
}