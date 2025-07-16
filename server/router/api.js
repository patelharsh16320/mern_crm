const express = require('express');
const { Home } = require('../controllers/auth');
const { createUser, updateUser, deleteUser, deleteAllUsers } = require('../controllers/companyController');
const { createTicket, updateTicket, deleteTicket, deleteAllTickets } = require('../controllers/ticketController');
const { getAllRecords } = require('../controllers/modelController')
const router = express.Router();

// Get API 
router.route('/').get(Home);
router.get('/show-:table', getAllRecords);

// Post API
router.route('/create-user').post(createUser);
router.route('/update-user').post(updateUser);
router.route('/create-ticket').post(createTicket);
router.route('/update-ticket').post(updateTicket);

// Delete API
router.route('/delete-user/:id').delete(deleteUser);
router.route('/delete-alluser').delete(deleteAllUsers);
router.route('/delete-ticket/:id').delete(deleteTicket);
router.route('/delete-allticket').delete(deleteAllTickets);

module.exports = router;