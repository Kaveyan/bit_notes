import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/uploads', {
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
      const response = await fetch(`http://localhost:8000/users/uploads/${uploadId}/like`, {
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
    <div className="dash">
      <div className="dash-menu">
        <Menu />
      </div>

      <div className="dash-main-admin">
        {error && <p>Error: {error}</p>}
        <div className="grid-container">
          {uploads.map((upload) => (
            <div className="display-box" key={upload._id}>
              <h1>{upload.subject}</h1>
              <p>
                <a
                  href={upload.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                >
                  <FontAwesomeIcon icon={faNoteSticky} />
                </a>
              </p>
              <div className="box-down">
                <p className="user">by {upload.user.firstName}</p>
                <p onClick={() => handleLike(upload._id)}>
                  <FontAwesomeIcon icon={faHeart} /> &nbsp; {upload.points}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
