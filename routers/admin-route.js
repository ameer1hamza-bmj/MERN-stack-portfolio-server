const express = require('express');
const router = express.Router()
const admin_controller = require('../controllers/admin-controller');
const verifyToken = require('../Middlewares/verifyToken');
const upload = require('../Middlewares/multer-middleware');
const admin_middleware = require('../Middlewares/admin-middleware');

//Get Action
router.route('/users').get(verifyToken, admin_middleware, admin_controller.getAllUsers)
router.route('/contacts').get(verifyToken, admin_middleware, admin_controller.getAllContacts)
router.route('/users/:id').get(verifyToken, admin_middleware, admin_controller.getUserById)
router.route('/project').get(admin_controller.getAllProjects)

//Delete Actions
router.route('/users/delete/:id').delete(verifyToken, admin_middleware, admin_controller.deleteUserById)
router.route('/contacts/delete/:id').delete(verifyToken, admin_middleware, admin_controller.deleteContactById);

//Update Action
router.route('/users/update/:id').patch(verifyToken, admin_middleware, admin_controller.updateUserById)


//Upload Projects
router.route('/projects/uploads').post(verifyToken, admin_middleware, upload.single('image'), admin_controller.uploadProjects)




module.exports = router;
