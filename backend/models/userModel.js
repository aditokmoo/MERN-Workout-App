const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userScheme = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userScheme.statics.register = async function(email, password) {
    // Check if email and password are typed
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    // Check if email is valid
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    // Check if password is strong
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user
}

userScheme.statics.login = async function(email, password) {
    // Check if email and password are typed
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email });

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user;
}

module.exports = mongoose.model('User', userScheme)