const express = require('express');
const { Home } = require('../controllers/auth');
const { createUser, updateUser, deleteUser, deleteAllUsers, loginUser } = require('../controllers/userController');
const { createTicket, updateTicket, deleteTicket, deleteAllTickets } = require('../controllers/ticketController');
const { createProduct, updateProduct, deleteProduct, deleteAllProduct, createCategory, updateCategory, deleteCategory, deleteAllCategories } = require('../controllers/productController');
const { updateRole, deleteRole, deleteAllRoles } = require('../controllers/roleController');
const { getAllRecords, createCart } = require('../controllers/modelController')
const router = express.Router();

//* Get API 
router.route('/').get(Home);
router.get('/show-:table', getAllRecords);


//* Post API
router.route('/create-user').post(createUser);
router.route('/update-user').post(updateUser);

router.route('/create-ticket').post(createTicket);
router.route('/update-ticket').post(updateTicket);

router.route('/login').post(loginUser);
router.route('/update-role').post(updateRole);

router.route('/create-product').post(createProduct);
router.route('/update-product').post(updateProduct);
router.route('/create-product-category').post(createCategory);
router.route('/update-product-category').post(updateCategory);

router.route('/create-cart').post(createCart);


//* Delete API
router.route('/delete-user/:id').delete(deleteUser);
router.route('/delete-alluser').delete(deleteAllUsers);

router.route('/delete-ticket/:id').delete(deleteTicket);
router.route('/delete-allticket').delete(deleteAllTickets);

router.route('/delete-role/:id').delete(deleteRole);
router.route('/delete-allrole').delete(deleteAllRoles);

router.route('/delete-product/:id').delete(deleteProduct);
router.route('/delete-allproduct').delete(deleteAllProduct);
router.route('/delete-category/:id').delete(deleteCategory);
router.route('/delete-allcategory').delete(deleteAllCategories);

module.exports = router;