const express = require('express');
const { Home } = require('../controllers/auth');
const { createUser,updateUser,  deleteUser, deleteAllUsers } = require('../controllers/companyController')
const { getAllRecords } = require('../controllers/modelController')
const router = express.Router();

// Get API 
router.route('/').get(Home);
router.get('/show-:table', getAllRecords);

// Post API
router.route('/create-user').post(createUser);
router.route('/update-user').post(updateUser);

// Delete API
router.route('/delete-user/:id').delete(deleteUser);
router.route('/delete-alluser').delete(deleteAllUsers);

module.exports = router;