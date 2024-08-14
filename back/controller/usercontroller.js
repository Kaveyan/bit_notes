const { User, Faculty, } = require('../model/userModel');

const registerUser = async (req, res) => {
    const { firstName, department , batch, email, password } = req.body;
  
    try {
      const user = await User.create({
        firstName,
        department,
        batch,
        email,
        password
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const registerFaculty = async (req, res) => {
    const { firstName,department, email, password } = req.body;
  
    try {
      const user = await Faculty.create({
        firstName,
        department,
        email,
        password
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
   
  const Login = async (req, res) => {
    const { role, email, password } = req.body;
  
    let user;
    if (role === 'student') {
      user = await User.findOne({ email });
    } else if (role === 'faculty') {
      user = await Faculty.findOne({ email });
    }
  
    if (user && user.password === password) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  };
  
  module.exports = { registerUser,registerFaculty,Login};