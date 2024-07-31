const User = require('../models/User');
const Bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');

// Creating a new user
exports.createUser = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    // condition for checking if user is already in the database
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        // encrypting password
        const hashedPassword = await Bcrypt.hash(password, 10);

        // for new User
        const newUser = new User({
            name, email, mobile,
            password: hashedPassword,
        });

        await newUser.save();

        // Generating web token
        const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            message: 'Successfully created user, please login to enjoy services!',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.mobile,
            },
            token,
        });
    } catch(err){
        res.status(500).json({ message: 'Sorry! this occurred from our side, please try again later.', error: err.message });
    }
};

// Getting user details
exports.getUserDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch(err){
        res.status(200).json({ message: 'Sorry! this occurred from our side, please try again later.', error: err.message });
    }
};