const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API

//! For Users Start

// Create New Users 
const createUser = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/create-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.username,
        email: formData.email,
        number: formData.phone,
        doj: formData.doj,
        address: formData.address,
        password: "123456",
        c_password: "123456"
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create user');

    return data;
  } catch (err) {
    throw err;
  }
};

// Update Users 
const updateUser = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/update-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: formData.user_id,
        name: formData.username,
        email: formData.email,
        password: formData.password,
        c_password: formData.c_password,
        number: formData.phone,
        address: formData.address,
        created_at: formData.doj
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update user');
    return data;
  } catch (err) {
    throw err;
  }
};

// Delete Single User
const deleteUserById = async (userId) => {
  const res = await fetch(`${BASE_URL}/delete-user/${userId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return await res.json();
};

// Delete All User
const deleteAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/delete-alluser`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete all users');
  return data;
};

//! For Users End

//! For Ticket Start
// Create New Ticket 
const createNewTicket = async (ticketData) => {
  try {
    const response = await fetch(`${BASE_URL}/create-ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

// Update Ticket
const updateTicketById = async (ticketData) => {
  const res = await fetch(`${BASE_URL}/update-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ticketData)
  });

  const data = await res.json();
  if (!res.ok || data.statusCode !== 200) {
    throw new Error(data.message || "Failed to update ticket");
  }
  return data;
};

// Delete Single Ticket
const deleteTicketById = async (ticketId) => {
  const res = await fetch(`${BASE_URL}/delete-ticket/${ticketId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return await res.json();
};

// Delete All Ticket
const deleteAllTicket = async () => {
  const res = await fetch(`${BASE_URL}/delete-allticket`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete all ticket');
  return data;
};

//! For Ticket End

//! For User Login/Logout Start

// Login User
const LoginUser = async (loginData) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  const data = await res.json();

  return data;
};
//! For User Login/Logout End

//! For Role Start

// Update Role
const updateUserRole = async (payload) => {
  const res = await fetch(`${BASE_URL}/update-role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
};

// Delete Single role
const deleteRoleById = async (roleId) => {
  const res = await fetch(`${BASE_URL}/delete-role/${roleId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return await res.json();
};

// Delete All Ticket
const deleteAllRole = async () => {
  const res = await fetch(`${BASE_URL}/delete-allrole`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete all ticket');
  return data;
};

//! For Product Start
// Create New Ticket 
const createNewProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/create-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

// Update Product
const updateProductById = async (productData) => {
  const res = await fetch(`${BASE_URL}/update-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  });

  const data = await res.json();
  if (!res.ok || data.statusCode !== 200) {
    throw new Error(data.message || "Failed to update Product");
  }
  return data;
};

// Delete Single Product
const deleteProductById = async (productData) => {
  const res = await fetch(`${BASE_URL}/delete-product/${productData}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete Product");
  }

  return await res.json();
};

// Delete All Product
const deleteAllProduct = async () => {
  const res = await fetch(`${BASE_URL}/delete-allproduct`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete all ticket');
  return data;
};

//! For Product End

//! For Cart Start
const createCart = async (user_id, products_qty) => {
  try {
    const response = await fetch(`${BASE_URL}/create-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        products_qty,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create Cart API Error:', error);
    return {
      message: 'Failed to create cart',
      statusCode: 500,
    };
  }
};

// Update Cart
const updateCart = async (req, res) => {
  try {
    const { cart_id, user_id, products_qty, created_at } = req.body;

    if (!cart_id || !user_id || !Array.isArray(products_qty) || !created_at) {
      return res.status(400).json({
        message: "Missing cart_id, user_id, products_qty (must be array), or created_at",
        statusCode: 400
      });
    }

    const productsQtyJson = JSON.stringify(products_qty);

    const sql = `UPDATE cart SET cart_id = ?, user_id = ?, products_qty = ?, created_at = ? WHERE 1`;
    const values = [cart_id, user_id, productsQtyJson, created_at];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("Cart update error:", err);
        return res.status(409).json({
          message: "Cart update failed",
          statusCode: 409
        });
      }

      return res.status(200).json({
        message: "Cart updated successfully",
        statusCode: 200,
        affectedRows: result.affectedRows
      });
    });

  } catch (error) {
    console.error("Internal error:", error);
    return res.status(500).json({
      message: "Internal server error while updating cart",
      statusCode: 500
    });
  }
};

//! For Cart End

//! For Role End

export {
  //? Users Export
  createUser, updateUser, deleteUserById, deleteAllUsers,

  //? Ticket Export
  createNewTicket, updateTicketById, deleteTicketById, deleteAllTicket, LoginUser,

  //? Role Export
  updateUserRole, deleteRoleById, deleteAllRole,

  //? Product Export,
  createNewProduct, updateProductById, deleteProductById, deleteAllProduct,

  // ? cart
  createCart, updateCart 
};