const mongoose = require('mongoose');
const uploadSchema = mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Please add a subject']
    },
    link: {
        type: String,
        required: [true, 'Please add a link']
    },
    verify: {
        type: Boolean,
        default: false  
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User', 
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0 
    },
    likedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
});


const Up = mongoose.model('Up', uploadSchema);
module.exports = { Up };
