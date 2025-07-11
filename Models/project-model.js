const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    image: String,
    heading: String,
    paragraph: String,
    link: String,
})

const Projects = mongoose.model('Projects', projectSchema)


module.exports = Projects;