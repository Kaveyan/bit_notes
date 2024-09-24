import React, { useState } from 'react';

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
    <div className='w-full m-auto max-w-md bg-white p-6 rounded-lg shadow-md'>
      <h2 className="text-2xl font-bold mb-4">Upload Document</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className="input-box">
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder='Title...'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="input-box">
          <label className="block text-gray-700">Batch</label>
          <input
            type="text"
            name="batch"
            placeholder='Batch...'
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <div className="input-box">
          <label className="block text-gray-700">Link</label>
          <input
            type="text"
            name="link"
            placeholder='Give PDF link'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Submit
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}
