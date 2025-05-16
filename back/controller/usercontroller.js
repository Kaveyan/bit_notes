const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel');
const {Up } =require('../model/uploadModel')

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, 'your_jwt_secret', { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { firstName, department, batch, email, password, role } = req.body;

    try {
       
        const user = await User.create({
            firstName,
            department,
            batch,
            email,
            password,  
            role
        });

       
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


const login = async (req, res) => {
    const { email, password, role} = req.body;

    try {
       
        const user = await User.findOne({ email });
        console.log('User:', user);  

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

       
        const isMatch = (password === user.password);
        console.log('Password match:', isMatch);  

        if (isMatch) {
            
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
      
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const upload = await Up.create({
            subject,
            link,
            batch,
            department: user.department,  
            user: req.user._id  
        });

        res.status(201).json(upload);  
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, login, upload };



