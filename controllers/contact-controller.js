const Contact = require("../Models/contact-model");

const contactForm = async (req, res, next) => {
    try {
        const { username, email, message } = req.body;
        if (!username || !email || !message) {
            res.status(400).json({ message: 'Please fill all the fields' })
        }
        const contactData = new Contact({ username, email, message });
        await contactData.save()

        return res.status(200).json({ message: 'Message Sent SuccessFully' })


    } catch (error) {
        next(error)
    }
}


module.exports = contactForm;