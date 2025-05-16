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
        const response = await fetch('https://bit-notes-backend.onrender.com/users/ranking', {
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
    <div className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-4 flex items-center">
        Ranking <FontAwesomeIcon icon={faRankingStar} className="ml-2" />
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-0 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Rank</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Department</th>
              <th className="py-3 px-6 text-left">Batch</th>
             
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-medium uppercase">
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6 flex items-center">
                  <FontAwesomeIcon icon={faRankingStar} className="mr-2 text-yellow-500" />
                  {user.firstName}
                </td>
                <td className="py-4 px-6">{user.department}</td>
                <td className="py-4 px-6">{user.batch}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
