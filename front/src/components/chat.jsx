import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatEndRef = useRef(null); // Create a ref for scrolling

  // Function to fetch all chat messages
  const fetchMessages = async () => {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage

    if (token) {
      try {
        const response = await fetch('https://bit-notes-backend.onrender.com/chat/messages', {
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
        sender: { firstName: 'You' }, // Mocked sender for demonstration
        message,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Optimistic update: update chat messages in UI before sending to the server
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(''); // Clear input field

      try {
        const response = await fetch('https://bit-notes-backend.onrender.com/chat/send', {
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

  // Scroll to bottom of the chat messages when they change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Group Chat</h2>
      <div className="flex-1 overflow-y-auto border border-gray-300 rounded-lg p-4">
        {/* Chat messages */}
        {chatMessages.map((msg, idx) => (
          <div key={idx} className="mb-4">
            <span className="font-semibold">{msg.sender.firstName}: </span>
            <span>{msg.message}</span>
            <div className="text-sm text-gray-500">{msg.timestamp}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-md"
          placeholder="Type a message"
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded-md">
          <FontAwesomeIcon icon={faRocket} />
        </button>
      </form>
    </div>
  );
}
