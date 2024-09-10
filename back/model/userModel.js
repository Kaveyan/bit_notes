const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a First Name']
    },
    department: {
        type: String,
        required: [true, 'Please add a Department']
    },
    batch: {
        type: Number,
        required: function () { return this.role === 'student'; }, 
    },
    email: {
        type: String,
        required: [true, 'Please add an Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a Password']
    },
    role: {
        type: String,
        enum: ['student', 'faculty'],
        required: true
    },
    point:{
        type:Number,
        default: 0
    }
});



const User = mongoose.model('User', userSchema);
module.exports = { User };
