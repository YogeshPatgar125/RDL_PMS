// // middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ message: 'Access Denied' });
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid Token' });
//     }
// };


const jwt = require('jsonwebtoken');

exports.verifyAdmin = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admin can perform this action.' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
