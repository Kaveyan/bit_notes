import React, { useEffect, useState } from 'react';
import Card from './Cards';

export default function Home() {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch('https://bit-notes-backend.onrender.com/users/uploads', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch uploads');
        }

        const data = await response.json();
        setUploads(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUploads();
  }, []);

  const handleLike = async (uploadId) => {
    try {
      const response = await fetch(`https://bit-notes-backend.onrender.com/users/uploads/${uploadId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === 'You have already liked this post') {
          window.alert('You have already liked this post.');
        } else {
          throw new Error('Failed to like the post');
        }
        return;
      }
  
      const updatedUpload = await response.json();
      
      // Update the uploads state with the new points value
      setUploads(uploads.map(upload => 
        upload._id === uploadId ? { ...upload, points: updatedUpload.points } : upload
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card uploads={uploads} error={error} handleLike={handleLike} />
  );
}
