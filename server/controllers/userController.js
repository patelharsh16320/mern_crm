const conn = require('../utils/db');
const bcrypt = require('bcrypt');

//! *************** User API start 
// create new User 
const createUser = async (req, res) => {
    try {
        const { name, email, password, c_password, number, address } = req.body;

        if (!name || !email || !password || !c_password || !number || !address) {
            return res.status(400).json({ message: "All fields are required", statusCode: 400 });
        }

        if (password !== c_password) {
            return res.status(400).json({ message: "Password & Confirm Password do not match", statusCode: 400 });
        }

        // ✅ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserSQL = `
            INSERT INTO users (name, email, password, c_password, number, address, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;

        const userValues = [name, email, hashedPassword, c_password, number, address];

        conn.query(insertUserSQL, userValues, (userErr, userResult) => {
            if (userErr) {
                return res.status(409).json({ message: "User already exists", statusCode: 409 });
            }

            const user_id = userResult.insertId;

            // ✅ Insert default role for new user
            const insertRoleSQL = `
                INSERT INTO role (role_id, email, role)
                VALUES (?, ?, 'user')
            `;

            const roleValues = [user_id, email];

            conn.query(insertRoleSQL, roleValues, (roleErr) => {
                if (roleErr) {
                    return res.status(500).json({ message: "Failed to assign role", statusCode: 500 });
                }

                return res.status(201).json({
                    message: "User and role created successfully",
                    statusCode: 201,
                    user_id: user_id
                });
            });
        });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", statusCode: 500 });
    }
};

// update new User 
const updateUser = async (req, res) => {
    try {
        const { user_id, name, email, password, c_password, number, address } = req.body;

        if (!user_id || !name || !email || !password || !c_password || !number || !address) {
            return res.status(400).json({ message: "All fields are required", statusCode: 400 });
        }

        if (password !== c_password) {
            return res.status(400).json({ message: "Password & Confirm Password do not match", statusCode: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
      UPDATE users SET 
        name = ?, 
        email = ?, 
        password = ?, 
        c_password = ?, 
        number = ?, 
        address = ?, 
        created_at = NOW()
      WHERE user_id = ?
    `;

        const values = [
            name,
            email,
            hashedPassword,
            hashedPassword,
            number,
            address,
            user_id
        ];

        conn.query(sql, values, (err, result) => {
            if (err) {
                return res.status(409).json({ message: "Failed to update user", statusCode: 409, error: err.message });
            }

            return res.status(200).json({ message: "User updated successfully", statusCode: 200 });
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", statusCode: 500, error: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            res.json({ message: 'users id is required', statusCode: 400 });
        }
        const query = `DELETE FROM users WHERE user_id = ?`;

        conn.query(query, [userId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'users not found', statusCode: 404 });
            } else {
                res.json({ message: 'users deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on delete users', statusCode: 500 });
    }
}

// Delete All Users
const deleteAllUsers = async (req, res) => {
    try {
        const query = `DELETE FROM Users WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Users are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email & Password are required', statusCode: 400 });
    }

    const userQuery = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    conn.query(userQuery, [email], async (err, result) => {
      if (err) {
        console.error('DB Error (userQuery):', err);
        return res.status(500).json({ message: 'Database error while fetching user', statusCode: 500 });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found', statusCode: 404 });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials', statusCode: 401 });
      }

      const roleQuery = `SELECT role FROM role WHERE email = ? LIMIT 1`;
      conn.query(roleQuery, [email], (roleErr, roleResult) => {
        if (roleErr) {
          console.error('DB Error (roleQuery):', roleErr);
          return res.status(500).json({ message: 'Database error while fetching role', statusCode: 500 });
        }

        const role = roleResult[0]?.role || 'user';

        return res.status(200).json({
          message: 'Login Successful',
          statusCode: 200,
          user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            number: user.number,
            address: user.address,
            role: role
          }
        });
      });   
    });

  } catch (err) {
    console.error('Unhandled Server Error:', err);
    return res.status(500).json({
      message: 'Internal server error',
      statusCode: 500,
      error: err.message
    });
  }
};

//! *************** User API End 

module.exports = {
    createUser, updateUser, deleteUser, deleteAllUsers, loginUser
};