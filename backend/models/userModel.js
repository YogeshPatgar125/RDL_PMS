// // models/userModel.js
// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['admin', 'teamleader', 'Web Developer', 'App Developer', 'Cloud Engineer', 'DevOps', 'Tester'], default: ' ' }
// });
// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'teamleader', 'employee'] },
    specificRole: { 
        type: String, 
        enum: ['Web Developer', 'App Developer', 'Cloud Engineer', 'DevOps', 'Tester'], 
        required: function() { return this.role === 'employee'; } // Required only for employees
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
