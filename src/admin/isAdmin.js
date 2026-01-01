import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.js';

// Check if user is logged in using JWT token
export const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                title: "Unauthorized", 
                message: "No token provided" 
            });
        }

        const token = authHeader.substring(7);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        // Get user from database
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ 
                title: "Unauthorized", 
                message: "User not found" 
            });
        }

        // Add user info to request
        req.user = {
            id: user._id.toString(),
            email: user.email,
            userName: user.userName,
            role: user.role
        };

        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                title: "Unauthorized", 
                message: "Invalid token" 
            });
        }
        res.status(500).json({ 
            title: "Error authenticating", 
            message: err.message 
        });
    }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'נדרשת התחברות לביצוע פעולה זו.' });
    }
    if (req.user.role !== 'admin' && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'אין לך הרשאה לבצע פעולה זו. נדרש תפקיד מנהל.' });
    }
    next();
};

export default isAdmin;
