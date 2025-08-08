const conn = require('../utils/db');

// Create Contact
// const createCart = async (req, res) => {
//   try {
//     const { user_id, products_qty } = req.body;

//     // Basic validation
//     if (!user_id || !Array.isArray(products_qty)) {
//       return res.status(400).json({
//         message: "Missing user_id or products_qty must be an array",
//         statusCode: 400
//       });
//     }

//     // Convert to JSON string for MySQL JSON column
//     const productsQtyJson = JSON.stringify(products_qty);

//     const sql = `INSERT INTO cart (user_id, products_qty, created_at) VALUES (?, ?, NOW())`;

//     const values = [user_id, productsQtyJson];

//     conn.query(sql, values, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(409).json({
//           message: "Cart insert failed",
//           statusCode: 409
//         });
//       }

//       return res.status(201).json({
//         message: "Cart created successfully",
//         statusCode: 201,
//         cart_id: result.insertId
//       });
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Internal server error while creating cart",
//       statusCode: 500
//     });
//   }
// };
const createContact = async (req, res) => {
  try {
    const { user_id, name, email, number, message, created_at } = req.body;
    console.log(req.body);
    
    if (!name || !email || !number || !message || !created_at) {
      return res.json({ message: "Fill All Details", statusCode: 400 });
    }


    const sql = `INSERT INTO contacts(user_id, name, email, number, message, created_at) VALUES (?,?,?,?,?,NOW())`;
    const values = [user_id, name, email, number, message, created_at];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ message: "Database error", statusCode: 100 });
      }

      return res.json({
        message: "Contact created successfully....",
        statusCode: 201,
        ticket_id: result.insertId,
      });
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Internal server error on create ticket", statusCode: 500 });
  }
};

// Delete role
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    if (!contactId) {
      return res.json({ message: 'Contact id is required', statusCode: 400 });
    }

    console.log('contactId', contactId);

    console.log('contactId', contactId)
    const query = `DELETE FROM contacts WHERE contact_id = ?`;

    conn.query(query, [contactId], (err, result) => {
      if (err) {
        res.json({ message: 'Database error', statusCode: 500 });
      }
      if (result.affectedRows === 0) {
        res.json({ message: 'Contact not found', statusCode: 404 });
      } else {
        res.json({ message: 'Contact deleted successfully', statusCode: 200 });
      }
    });

  } catch (err) {
    res.json({ message: 'Internal server error on delete Contact', statusCode: 500 });
  }
}

// Delete All Contacts
const deleteAllContact = async (req, res) => {
  try {
    const query = `DELETE FROM contacts WHERE 1`;
    conn.query(query, (err, result) => {
      res.json({ message: 'All contacts are deleted successfully', statusCode: 200 });
    })

  } catch (err) {
    res.json({ message: 'Internal server error on delete user', statusCode: 500 });
  }
}


module.exports = {
  createContact, deleteContact, deleteAllContact
};