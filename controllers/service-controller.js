const Service = require('../Models/service-model')

const services = async (req, res, next) => {
    try {
        const responce = await Service.find();
        if (!responce || responce.length === 0) {
            return res.status(404).json({ msg: 'No service found' });
        }
        res.status(200).json({ responce })

    } catch (error) {
        next(error)
    }
}


module.exports = services;