const User = require('../Models/auth-model');
const Contact = require('../Models/contact-model');
const Projects = require('../Models/project-model');


const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select({ password: 0 })
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(401).json({ message: 'Users Not Found' })
        }
        return res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}




const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);

        if (!contacts || contacts.length === 0) {
            return res.status(401).json({ message: 'contacts Not Found' })
        }
        return res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        const userById = await User.findOne({ _id: id })

        if (!userById) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('✅ Found user:', userById);
        res.status(200).json(userById)
    } catch (error) {
        next(error)
    }
}


const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Projects.find()
        if (!projects || projects.length === 0) {
            return res.status(401).json({ message: 'No Projects Found' })
        }
        return res.status(200).json(projects)
    } catch (error) {
        next(error)
    }
}



const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id })
        return res.status(200).json({ message: 'User Deleted Successfully' });

    } catch (error) {
        next(error)
    }
}

const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id })
        return res.status(200).json({ message: 'Contact Deleted Successfully' });

    } catch (error) {
        next(error)
    }
}




const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateUser = req.body;
        const UpdatedUserData = await User.updateOne({ _id: id }, {
            $set: updateUser,
        });

        if (UpdatedUserData.modifiedCount === 0) {
            return res.status(200).json({ message: 'No Changes Made' })
        }
        return res.status(200).json({ modifiedCount: 1, message: 'User updated successfully' });

    } catch (error) {
        next(error)
    }
}




const uploadProjects = async (req, res, next) => {
    try {
        const { heading, paragraph, link } = req.body;
        const image = req.file.filename;
        if (!req.file) {
            return res.status(400).json({ message: "Image is required!" });
        }

        const newProjects = new Projects({ image, heading, paragraph, link })
        await newProjects.save();

        res.status(201).json({ success: true, message: "Project Saved" });

    } catch (error) {
        next(error)
        res.status(500).json({ success: false, message: "Error", error: err.message });
    }
}







module.exports = { getAllUsers, getAllContacts, deleteUserById, deleteContactById, getUserById, updateUserById, uploadProjects, getAllProjects }