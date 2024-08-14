const mongoose=require('mongoose')
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
      required: [true, 'Please add a Batch']
    },
    email: {
      type: String,
      required: [true, 'Please add an Email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a Password']
    }
  });
  const facultySchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, 'Please add a First Name']
    },
    department: {
      type: String,
      required: [true, 'Please add a Department']
    },
    email: {
      type: String,
      required: [true, 'Please add an Email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a Password']
    }
  });

const User = mongoose.model('User', userSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
module.exports ={User,Faculty};