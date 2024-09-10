import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

export default function Rank() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/ranking', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ranking');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className='dash'>
      <div className='dash-menu'>
        <Menu />
      </div>

      <div className='dash-main-admin'>
        <h2>Ranking <FontAwesomeIcon icon={faRankingStar} /></h2>
        {error && <p>Error: {error}</p>}
        {users.map((user, index) => (
          <div className='box' key={index}>
            <div className='box-content'>
              <h3><FontAwesomeIcon icon={faRankingStar} /> {user.firstName}</h3>
              <p>{user.department}</p>
              <p>{user.batch}</p>
              <p>{user.point}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
