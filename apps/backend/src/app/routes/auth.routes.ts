import { Router } from 'express';
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const router = Router();

// Endpoint: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // The pre-save hook in user.model.ts will hash the password automatically
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const savedUser = await newUser.save();

        // Respond without sending the hashed password
        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Endpoint: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Use a generic message
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // User is authenticated, create a JWT
        const payload = {
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d', // Token will be valid for 7 days
        });

        // Respond with user info and token
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;