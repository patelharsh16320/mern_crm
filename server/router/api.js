const express = require('express');
const { Home } = require('../controllers/auth');
const { createUser, updateUser, deleteUser, deleteAllUsers, loginUser } = require('../controllers/userController');
const { createTicket, updateTicket, deleteTicket, deleteAllTickets } = require('../controllers/ticketController');
const { createProduct, updateProduct, deleteProduct, deleteAllProduct, createCategory, updateCategory, deleteCategory, deleteAllCategories } = require('../controllers/productController');
const { updateRole, deleteRole, deleteAllRoles } = require('../controllers/roleController');
const { getAllRecords } = require('../controllers/modelController')
const { createCart, showDataOfCart, updateCart } = require('../controllers/cartController')
const { createInvoice, updateInvoice, deleteInvoice, deleteAllInvoice, SingleInvoice } = require('../controllers/invoiceController')
const { createContact, deleteContact, deleteAllContact } = require('../controllers/contactController')
const router = express.Router();

//* Get API 
router.route('/').get(Home);
router.get('/show-:table', getAllRecords);
router.get('/cart-details/:user_id', showDataOfCart);
router.get('/single-invoice/:id', SingleInvoice);

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
router.route('/update-cart/').post(updateCart);

router.route('/create-invoice').post(createInvoice);
router.route('/update-invoice/').post(updateInvoice);

router.route('/create-contact').post(createContact);

//* Delete API
router.route('/delete-user/:id').delete(deleteUser);
router.route('/delete-alluser').delete(deleteAllUsers);

router.route('/delete-ticket/:id').delete(deleteTicket);
router.route('/delete-allticket').delete(deleteAllTickets);

router.route('/delete-role/:id').delete(deleteRole);
router.route('/delete-allrole').delete(deleteAllRoles);

router.route('/delete-invoice/:id').delete(deleteInvoice);
router.route('/delete-allinvoice').delete(deleteAllInvoice);

router.route('/delete-product/:id').delete(deleteProduct);
router.route('/delete-allproduct').delete(deleteAllProduct);
router.route('/delete-category/:id').delete(deleteCategory);
router.route('/delete-allcategory').delete(deleteAllCategories);

router.route('/delete-contact/:id').delete(deleteContact);
router.route('/delete-allcontact').delete(deleteAllContact);

module.exports = router;