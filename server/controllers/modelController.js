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
      'cart',
      'invoice',
      'invoice_items'
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

module.exports = {
  getAllRecords
};
 