const jwt = require('jsonwebtoken')
const User = require('../Models/auth-model')


const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    const token = authHeader.split(' ')[1];
    console.log('token from auth middleware', token);
    try {
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 })
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log('✅ Verified User:', userData);
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next()

    } catch (error) {
        console.log('❌ Token verification failed:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized, token invalid" });

    }
}
module.exports = verifyToken