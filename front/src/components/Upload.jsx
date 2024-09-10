import React, { useState } from 'react';
import Menu from './Menu';

export default function Upload() {
  const [subject, setSubject] = useState('');
  const [batch, setBatch] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/users/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
            },
            body: JSON.stringify({ subject, batch, link })
        });

        // Check if the response content type is JSON
        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            throw new Error('Server returned non-JSON response');
        }

        if (response.ok) {
            setMessage('Upload successful');
            setSubject('');
            setBatch('');
            setLink('');
        } else {
            setMessage(`Error: ${data.message || 'Unexpected error occurred'}`);
        }
    } catch (error) {
        setMessage(`Error: ${error.message}`);
    }
};


  return (
    <div className='dash'>
      <div className='dash-menu'>
        <Menu />
      </div>

      <div className='dash-main-admin'>
        <form className='up-form' onSubmit={handleSubmit}>
          <div className='res'>
            <div className="input-box">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder='Title...'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='res'>
            <div className="input-box">
              <label>Batch</label>
              <input
                type="text"
                name="batch"
                placeholder='Batch...'
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='res'>
            <div className="input-box">
              <label>Link</label>
              <input
                type="text"
                name="link"
                placeholder='Give PDF link'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit">Submit</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}
