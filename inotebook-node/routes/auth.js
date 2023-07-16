const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchusers = require('../middleware/fetchuser');

const JWT_SECRET = "somerandomstring"

// ROUTE 1 : Create a User using: POST "/api/auth/createuser". Doesn't require authentication
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }).escape(),
    body('email', 'Enter a valid email').isEmail().escape(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }).escape()
], async (req, res) => {
    try {
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        // Check weather the user with this email exists already
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        let securedPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        });

        res.status(200).json(user);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// ROUTE 2 : Authenticate a User using: POST "/api/auth/login". Doesn't require authentication
router.post('/login', [
    body('email', 'Enter a valid email').isEmail().escape(),
    body('password', 'Password cannot be blank').exists().escape()
], async (req, res) => {
    try {
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
    
        const { email, password } = req.body;

        let user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({error: "Please try to login with with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare) {
            return res.status(400).json({error: "Please try to login with with correct credentials"});
        }

        const data = {
            user: {
                email: user.email
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        return res.status(200).json({authToken})
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

// ROUTE 3 : Get loggedin User Details using: POST "/api/auth/getuser". Authentication required
router.post('/getuser', fetchusers, async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email})
    
        res.status(200).json(user);
    }
    catch(error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;