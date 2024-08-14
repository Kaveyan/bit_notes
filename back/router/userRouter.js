const express = require('express');
const router = express.Router();
const { registerUser, registerFaculty,Login } = require('../controller/usercontroller');

router.post('/studentregister', registerUser);
router.post('/facultyregister', registerFaculty);
router.post('/login', Login);


module.exports = router;
