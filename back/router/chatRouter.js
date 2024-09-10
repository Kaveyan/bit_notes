// chatRouter.js
const express = require('express');
const { Chat } = require('../model/chatModel');  // Import the Chat model
const { protect } = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

router.post('/send', protect, async (req, res) => {
    const {  message } = req.body;
    const department = req.user.department; 
    const userId = req.user._id;  // Ensure this is populated correctly from the protect middleware

    // Debug logs
    console.log("Received department:", department);
    console.log("Received message:", message);
    console.log("User ID:", userId);
    if (!department) {
        return res.status(400).json({ message: 'User department not found' });
    }

    try {
        // Save the message in the database
        const chatMessage = await Chat.create({ department, sender: userId, message });
        console.log("Chat saved:", chatMessage);  // Log the saved message
        res.status(201).json(chatMessage);
    } catch (error) {
        console.error("Error saving chat message:", error.message);  // Log the error
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
});

router.get('/messages', protect, async (req, res) => {
    const department = req.user.department; // Get the department from the authenticated user

    try {
        if (!department) {
            return res.status(400).json({ message: 'User department is not defined.' });
        }

        // Find chat messages based on the user's department
        const messages = await Chat.find({ department })
        .populate('sender', 'firstName') // Populate sender with firstName
        .exec();
    
        
        if (!messages.length) {
            return res.status(404).json({ message: 'No messages found for your department.' });
        }

        res.status(200).json(messages); // Send the found messages
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
    }
});

module.exports = router;
