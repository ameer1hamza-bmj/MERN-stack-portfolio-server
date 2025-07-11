const User = require('../Models/auth-model')
const bcrypt = require('bcryptjs')

const registration = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body;
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            return res.status(400).json({ message: 'User Already registered' })
        }

        const newUser = new User({ username, email, phone, password })
        await newUser.save()
        const token = await newUser.generateToken();

        res.status(201).json({
            message: "Registration successful",
            id: newUser._id,
            token,
            isAdmin: newUser.isAdmin,
        })

    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const isMatchPassword = await user.comparePassword(password)
        if (!isMatchPassword) {
            return res.status(401).json({
                message: 'Invalid email or password',
            })

        }
        const token = await user.generateToken()
        return res.status(200).json({
            message: 'Login successfull',
            token,
            id: user._id.toString(),
            isAdmin: user.isAdmin,
        })

    } catch (error) {
        next(error)
    }
}



const getUser = async (req, res, next) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ message: userData })

    } catch (error) {
        next(error)
        console.log(`Error from the User Route ${error}`);

    }
}


module.exports = { registration, login, getUser }