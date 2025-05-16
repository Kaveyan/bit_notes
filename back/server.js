const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors');
const userRouter = require('./router/userRouter');
const chatRouter = require('./router/chatRouter'); 
const { protect } = require('./middleware/authMiddleware'); 

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

const port = 8000;

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://kaveyanb:Toii2mxqeHBQ5sW7@cluster0.6xc5oea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log(' cloud DB connected'))
    .catch(err => console.log('DB connection error:', err));

app.use('/users', userRouter);

app.use('/chat', chatRouter); 



server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
