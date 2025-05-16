import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faUpload, faRankingStar, faMessage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from "react-router-dom";

export default function MenuFaculty() {
    const navigate = useNavigate();



    const handleLogout = () => {
      localStorage.removeItem('user'); 
      localStorage.removeItem('token');
      navigate('/'); 
    };
  
    return (
      <div className='menu'>
       
      </div>
    );
}
