import pool from '../model/model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    try {
        const userExistsQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
        const [existingUsers] = await pool.query(userExistsQuery, [email, username]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'User with that email or username already exists.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const insertUserQuery = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
        const [result] = await pool.query(insertUserQuery, [username, email, hashedPassword]);

        res.status(201).json({ 
            message: 'User registered successfully',
            userId: result.insertId 
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const findUserQuery = 'SELECT * FROM users WHERE email = ?';
        const [users] = await pool.query(findUserQuery, [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const payload = {
            id: user.id,
            username: user.username
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logout successful.' });
};