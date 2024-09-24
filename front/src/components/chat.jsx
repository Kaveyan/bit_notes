import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost, faRocket } from '@fortawesome/free-solid-svg-icons';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatEndRef = useRef(null); // Create a ref for scrolling

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
        sender: { firstName: 'You' }, // Mocked sender for demonstration
        message,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Optimistic update: update chat messages in UI before sending to the server
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
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

  // Scroll to bottom of the chat messages when they change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-3xl font-bold mb-4">Group Chat</h2>
        <div className="chat-box overflow-y-auto border border-gray-300 rounded-lg p-4" style={{ height: 'calc(100vh - 265px)' }}>
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, index) => (
              <div key={index} className="chat-message mb-2">
                <p className="chat-sender font-semibold">
                  <FontAwesomeIcon icon={faGhost} className="mr-2" />
                  {msg.sender.firstName}
                </p>
                <p className="chat-content bg-gray-100 p-2 rounded-md">
                  <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  {msg.message}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          )}
          {/* This empty div acts as a scroll target */}
          <div ref={chatEndRef} />
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="flex p-4 mb-16 bg-white border-t border-gray-300">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-md mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
}
