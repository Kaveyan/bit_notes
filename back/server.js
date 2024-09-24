const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors');
const userRouter = require('./router/userRouter');
const chatRouter = require('./router/chatRouter');  // Import chat routes
const { protect } = require('./middleware/authMiddleware'); // Import protect middleware

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',  // Assuming your frontend is on this port
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bitlearn')
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB connection error:', err));

// User routes
app.use('/users', userRouter);

// Chat routes
app.use('/chat', chatRouter);  // Attach chat routes

// Socket.io event handlers
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join the department group
    socket.on('joinDepartment', (department) => {
        socket.join(department);
        console.log(`User joined department: ${department}`);
    });

    // Handle new messages
    socket.on('sendMessage', async (data) => {
        const { department, message, userId } = data;

        // Save message to database
        try {
            const chatMessage = await Chat.create({ department, sender: userId, message });
            io.to(department).emit('receiveMessage', chatMessage); // Emit the message to the department group
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
