const conn = require('../utils/db');

//! *************** User API start 
// create new User 
const createUser = async (req, res) => {
    try {
        const { name, email, password, c_password, number, address } = req.body;
        if (!name || !email || !password || !c_password || !number || !address) {
            return res.json({ message: "Please provide a name", statusCode: 400 });
        }

        if (password !== c_password) {
            return res.json({ message: 'passoword & confirm password are not same!...' })
        }

        const sql = "INSERT INTO users(name, email, password, c_password, number, address, created_at) VALUES (?,?,?,?,?,?,NOW())";

        const value = [name, email, password, c_password, number, address];

        conn.query(sql, value, (err, result) => {
            if (err) {
                return res.json({ message: "User alredy exist...!, try other one.", statusCode: 100, });
            }
            return res.json({ message: "User created successfully", statusCode: 201, user_id: result.insertId });
        });
    } catch (error) {
        return res.json({ message: "Internal server error on create User", statusCode: 500 });
    }
};

// update new User 
const updateUser = async (req, res) => {
    try {
        const { user_id, name, email, password, c_password, number, address, created_at } = req.body;
        if (!user_id) { return res.json({ message: "User ID and name are required", statusCode: 400 }); }

        const sql = `UPDATE users SET 
        name = ?,
        email = ?,
        password = ?,
        c_password = ?,
        number = ?,
        address = ?,
        created_at = ?
        WHERE user_id= ?`;

        const value = [name, email, password, c_password, number, address, created_at, user_id];

        conn.query(sql, value, (err, result) => {
            if (err) { return res.json({ message: "User name is already exist...!, try one name", statusCode: 100, error: err.message }); }
            res.json({ message: "User updated successfully.", statusCode: 200 });
        });
    } catch (error) { return res.json({ message: "Internal server error on create User", statusCode: 500, error: error.message }); }
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

// For login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email & Password are required', statusCode: 400 });
        }

        const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;

        conn.query(sql, [email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'DB Error', statusCode: 500 });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'User not found', statusCode: 404 });
            }

            const user = result[0];

            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials', statusCode: 401 });
            }

            return res.status(200).json({
                message: 'Login Successful',
                statusCode: 200,
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                    number: user.number,
                    address: user.address,
                },
            });
        });

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', statusCode: 500 });
    }
}

//! *************** User API End 

module.exports = {
    createUser, updateUser, deleteUser, deleteAllUsers, loginUser
};