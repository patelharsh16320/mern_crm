const conn = require('../utils/db');

// Display All company
const getAllRecords = async (req, res) => {
    try {
        const tableName = req.params.table;
        const validTables = [
            'users',
            'ticket',
            'role',
            'product',
            'product_category',
            'product_category_map',
            'cart'
        ];

        if (!validTables.includes(tableName)) {
            return res.json({ message: 'Invalid table name', statusCode: 500 });
        }
        const query = `SELECT * FROM \`${tableName}\` WHERE 1;`;
        conn.query(query, (err, results) => {
            if (err) {
                return res.statusCode(500).json({ message: 'Internal server error' });
            }
            res.json({ users: results, statusCode: 200 });
        });
    } catch (error) {
        res.json({ message: 'Internal server error on getAllRecords', statusCode: 500 });
    }
}

const createCart = async (req, res) => {
  try {
    const { user_id, products_qty } = req.body;

    // Basic validation
    if (!user_id || !Array.isArray(products_qty)) {
      return res.status(400).json({
        message: "Missing user_id or products_qty must be an array",
        statusCode: 400
      });
    }

    // Convert to JSON string for MySQL JSON column
    const productsQtyJson = JSON.stringify(products_qty);

    const sql = `INSERT INTO cart (user_id, products_qty, created_at) VALUES (?, ?, NOW())`;

    const values = [user_id, productsQtyJson];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(409).json({
          message: "Cart insert failed",
          statusCode: 409
        });
      }

      return res.status(201).json({
        message: "Cart created successfully",
        statusCode: 201,
        cart_id: result.insertId
      });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error while creating cart",
      statusCode: 500
    });
  }
};


module.exports = {
    getAllRecords, createCart
};