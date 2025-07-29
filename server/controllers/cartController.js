const conn = require('../utils/db');

// Show All Cart Data
const showDataOfCart = async (req, res) => {
  const userId = req.params.user_id;

  try {
    // Ensure .promise() is used
    const [cartRows] = await conn.promise().query(
      'SELECT cart_id, products_qty, created_at FROM cart WHERE user_id = ?',
      [userId]
    );

    if (cartRows.length === 0) {
      return res.status(404).json({ message: 'No cart found for this user' });
    }

    const allCartItems = [];

    cartRows.forEach(cart => {
      try {
        const items = JSON.parse(cart.products_qty);
        items.forEach(item => {
          allCartItems.push({
            cart_id: cart.cart_id,
            created_at: cart.created_at,
            product_id: item.product_id,
            qty: item.qty,
            price: item.price
          });
        });
      } catch (err) {
        console.warn(`Invalid JSON in cart_id ${cart.cart_id}`);
      }
    });

    if (allCartItems.length === 0) {
      return res.status(200).json({ data: [] });
    }

    const productIds = [...new Set(allCartItems.map(item => item.product_id))];

    // Use promise wrapper on sonn too
    const [productRows] = await conn.promise().query(
      `SELECT product_id, name, price, sell_price FROM product WHERE product_id IN (${productIds.map(() => '?').join(',')})`,
      productIds
    );

    const result = allCartItems.map(item => {
      const product = productRows.find(p => p.product_id === item.product_id);
      const finalPrice = product?.sell_price ?? product?.price ?? 0;

      return {
        cart_id: item.cart_id,
        created_at: item.created_at,
        product_id: item.product_id,
        product_name: product?.name || 'Unknown',
        qty: item.qty,
        price: product?.price || 0,
        sell_price: product?.sell_price || null,
        final_price: finalPrice
      };
    });

    res.status(200).json({ data: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//* Create Cart
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
const createCart = async (req, res) => {
  try {
    const { cart_id, user_id, products_qty, created_at } = req.body;

    // Validation
    if (!cart_id || !user_id || !Array.isArray(products_qty) || !created_at) {
      return res.status(400).json({
        message: "Missing cart_id, user_id, products_qty (must be array), or created_at",
        statusCode: 400
      });
    }

    // Convert to JSON string for MySQL
    const productsQtyJson = JSON.stringify(products_qty);

    const sql = `INSERT INTO cart (cart_id, user_id, products_qty, created_at) VALUES (?, ?, ?, ?)`;
    const values = [cart_id, user_id, productsQtyJson, created_at];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("Cart insert error:", err);
        return res.status(409).json({
          message: "Cart insert failed",
          statusCode: 409,
          error: err
        });
      }

      return res.status(201).json({
        message: "Cart created successfully",
        statusCode: 201,
        cart_id: cart_id
      });
    });

  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      message: "Internal server error while creating cart",
      statusCode: 500
    });
  }
};

// Update Cart
const updateCart = async (req, res) => {
  try {
    const { user_id, products_qty, created_at } = req.body;

    // Validation
    if (!user_id || !Array.isArray(products_qty) || !created_at) {
      return res.status(400).json({
        message: "Missing user_id, products_qty (must be array), or created_at",
        statusCode: 400
      });
    }

    const productsQtyJson = JSON.stringify(products_qty);

    // Step 1: Check if user_id exists in cart table
    const checkSql = `SELECT * FROM cart WHERE user_id = ?`;
    conn.query(checkSql, [user_id], (err, result) => {
      if (err) {
        console.error("Error checking user_id in cart:", err);
        return res.status(500).json({
          message: "Database error while checking user_id",
          statusCode: 500
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: `No cart found for user_id: ${user_id}`,
          statusCode: 404
        });
      }

      // Step 2: Perform the update
      const updateSql = `
        UPDATE cart 
        SET products_qty = ?, created_at = ?
        WHERE user_id = ?
      `;
      const values = [productsQtyJson, created_at, user_id];

      conn.query(updateSql, values, (err, updateResult) => {
        if (err) {
          console.error("Error updating cart:", err);
          return res.status(409).json({
            message: "Cart update failed",
            statusCode: 409
          });
        }
        return res.status(200).json({
          message: "Cart updated successfully",
          statusCode: 200,
          affectedRows: updateResult.affectedRows
        });
      });
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      message: "Internal server error while updating cart",
      statusCode: 500
    });
  }
};

module.exports = {
  showDataOfCart, createCart, updateCart
};