const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function (next) {
    console.log('🧠 Pre-save middleware is running...');
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        console.log('🔐 Hashed Password:', hashedPassword);
        user.password = hashedPassword;
        next();
    } catch (error) {
        console.log('❌ Error while hashing:', error);
        next(error);
    }
})

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            id: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
    } catch (error) {
        console.log(error);

    }
}
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('Users', userSchema)

module.exports = User