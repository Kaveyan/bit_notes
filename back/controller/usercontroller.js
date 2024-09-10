const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel');
const {Up } =require('../model/uploadModel')

// Function to generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, 'your_jwt_secret', { expiresIn: '30d' });
};

// Function to register a new user
const registerUser = async (req, res) => {
    const { firstName, department, batch, email, password, role } = req.body;

    try {
        // Create a new user without hashing the password
        const user = await User.create({
            firstName,
            department,
            batch,
            email,
            password,  // Store the password as plain text
            role
        });

        // Respond with the created user's information and a token
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to handle user login
const login = async (req, res) => {
    const { email, password, role} = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        console.log('User:', user);  

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

       
        const isMatch = (password === user.password);
        console.log('Password match:', isMatch);  // Debugging: Check password match

        if (isMatch) {
            // Respond with the user's information and a token if the password matches
            res.json({
                _id: user._id,
                firstName: user.firstName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const upload = async (req, res) => {
    const { subject, link, batch } = req.body;

    try {
        // Ensure that req.user._id is properly populated by the protect middleware
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Fetch the user to get the department
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const upload = await Up.create({
            subject,
            link,
            batch,
            department: user.department,  // Fetch department directly from the user
            user: req.user._id  
        });

        res.status(201).json(upload);  // Use 201 Created for successful upload
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, login, upload };



