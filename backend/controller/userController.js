const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create Token Function
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// User Login Function
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = await createToken(user._id);

        res.status(200).json({ email, token })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

// User Register Function
const userRegister = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.register(email, password)

        const token = await createToken(user._id)

        res.status(200).json({ email, token })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { userLogin, userRegister }