
const express = require('express');
const { Chat } = require('../model/chatModel');  
const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/send', protect, async (req, res) => {
    const {  message } = req.body;
    const department = req.user.department; 
    const userId = req.user._id;  

    console.log("Received department:", department);
    console.log("Received message:", message);
    console.log("User ID:", userId);
    if (!department) {
        return res.status(400).json({ message: 'User department not found' });
    }

    try {

        const chatMessage = await Chat.create({ department, sender: userId, message });
        console.log("Chat saved:", chatMessage);  
        res.status(201).json(chatMessage);
    } catch (error) {
        console.error("Error saving chat message:", error.message); 
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
});

router.get('/messages', protect, async (req, res) => {
    const department = req.user.department; 

    try {
        if (!department) {
            return res.status(400).json({ message: 'User department is not defined.' });
        }

       
        const messages = await Chat.find({ department })
        .populate('sender', 'firstName') 
        .exec();
    
        
        if (!messages.length) {
            return res.status(404).json({ message: 'No messages found for your department.' });
        }

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
    }
});

module.exports = router;
