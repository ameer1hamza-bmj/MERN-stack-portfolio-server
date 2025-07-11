const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body)
        next()
    } catch (error) {
        return res.status(400).json({
            status: 'validation failed',
            errors: error.errors.map(err => ({
                path: err.path[0],
                message: err.message
            }))
        });
    }
}
module.exports = validate