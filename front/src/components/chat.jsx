import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost, faRocket } from '@fortawesome/free-solid-svg-icons';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Function to fetch all chat messages
  const fetchMessages = async () => {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage

    if (token) {
      try {
        const response = await fetch('http://localhost:8000/chat/messages', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in request
          },
        });
        const data = await response.json();
        if (response.ok) {
          setChatMessages(data); // Set the fetched messages
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  // Function to send a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get JWT token from localStorage

    if (message.trim() && token) {
      const newMessage = {
        sender: 'You', 
        content: message,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Optimistic update: update chat messages in UI before sending to the server
      setChatMessages([...chatMessages, newMessage]);
      setMessage(''); // Clear input field

      try {
        const response = await fetch('http://localhost:8000/chat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the token in headers
          },
          body: JSON.stringify({ message }), // Send the message to the server
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Error:', data.message);
        } else {
          // Fetch updated messages after sending a new message
          fetchMessages();
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Fetch all chat messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className='dash'>
    <div className='dash-menu'>
      <Menu />
    </div>

    <div className='dash-main-admin'>
      <div className="chat-container">
        <h2>Group Chat</h2>
        <div className="chat-box">
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, index) => (
              <div key={index} className="chat-message">
                <p className="chat-sender"><FontAwesomeIcon icon={faGhost} />{msg.sender.firstName}</p>
                <p className="chat-content"><FontAwesomeIcon icon={faRocket} />{msg.message}</p>
              </div>
            ))
          ) : (
            <p>No messages yet. Start the conversation!</p>
          )}
        </div>
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
    </div>
  );
}
