const conn = require('../utils/db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const logger = require("../utils/logger");
const multer = require("multer");

// Display All company
const getAllRecords = async (req, res) => {
    try {
        const tableName = req.params.table;
        const validTables = [
            'company',
            'positions_desc',
            'company_profile',
            'job_create_list',
            'users',
            'job_apply_list',
            'job_position'
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

const getShowJobUsers = async (req, res) => {
    try {  
        const query = `SELECT jcl.*, 
        user.name AS posted_by_name, 
        user.email AS posted_by_email 
        FROM job_create_list jcl LEFT JOIN users 
        user ON jcl.posted_by = user.id;`
        conn.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error', statusCode: 500 });
            }            
            res.json({ jobs: results, statusCode: 200 });
        });
    } catch (err) {
        res.json({ message: 'Internal server error on login user', statusCode: 500 });
    }
}

// Login
const Login = async (req, res) => {
    try {

        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.json({ message: "Missing required fields", statusCode: 400 });
        }

        const query = 'SELECT * FROM `users` WHERE `email` = ? AND `role` = ?;'

        const [results] = await conn.promise().query(query, [email, role]);
        if (results.length <= 0) {
            return res.json({ message: "Invalid credentials", statusCode: 401 });
        }
        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid credentials", statusCode: 401 });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            // { expiresIn: "1h" }  // Token expires in 1 hour
        );

        return res.json({
            message: "Login successful",
            user: user,
            token: token,
            statusCode: 200,
        });

    }
    catch (err) {
        res.json({ message: 'Internal server error on login user', statusCode: 500 });
    }
}

// Create a new user/ Sign Up
const userCreate = async (req, res) => {
    try {
        const { name, email, password, role, number, file_upload } = req.body;
        if (!name || !email || !password || !role) {
            return res.json({ message: "Missing required fields", statusCode: 400 });
        }
        const checkQuery = `SELECT * FROM users WHERE email = ?`;
        const [existingUsers] = await conn.promise().query(checkQuery, [email]);

        if (existingUsers.length > 0) {
            return res.json({ message: "Email already exists, use another email", statusCode: 400 });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (name, email, password, role, number, file_upload) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, email, hashPassword, role, number, file_upload];
        const [result] = await conn.promise().query(query, values);

        res.json({ message: "User created successfully", userId: result.insertId, statusCode: 200 });

    } catch (error) {
        res.json({ message: "Internal server error on create user", statusCode: 500 });
    }
};

// Delete new user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            res.json({ message: 'User id is required', statusCode: 400 });
        }
        const query = `DELETE FROM users WHERE id = ?`;
        conn.query(query, [userId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'User not found', statusCode: 404 });
            } else {
                res.json({ message: 'User deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

// Delete All Users
const deleteAllUsers = async (req, res) => {
    try {
        const query = `DELETE FROM users WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Users are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

// Update new user   
const updateUser = async (req, res) => {
    try {
        const { id, name, password, role, file_upload, number, created_at } = req.body;

        if (!id) {
            return res.status(400).json({ message: "User ID is required", status: 400 });
        }

        const query = `UPDATE users SET name=?, password=?, role=?, file_upload=?, number=?, created_at=? WHERE id = ?`;
        const hashPassword = await bcrypt.hash(password, 10);
        const values = [name, hashPassword, role, file_upload, number, created_at, id];

        const [result] = await conn.promise().query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        res.json({ message: "User updated successfully", status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Internal server error on update user", statusCode: 500, error: error });
    }
};


// For update show User 
const updateShowUser = async (req, res) => {
    const { id } = req.query;
    try {
        const query = 'SELECT * FROM `users` WHERE id = ?;';
        const [user] = await conn.promise().query(query, [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: user[0] });
    } catch (error) {
        res.json({ message: 'Internal server error on show user', statusCode: 500 });
    }
}

// Image store in frontend
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../client/public/upload');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Ensure unique filename
    }
});

const upload = multer({ storage: storage }).single('file');

const uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: 'File upload failed', statusCode: 500 });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded', statusCode: 400 });
        }

        res.json({
            message: 'File uploaded successfully',
            fileName: req.file.filename,
            statusCode: 200
        });
    });
}

// Log Login credentails send for log file
const logLogin = (req, res) => {
    const { userId, userName, email } = req.body;

    if (!userId || !userName || !email) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    const logMessage = `[LOGIN] User: ${userName} (ID: ${userId}, Email: ${email}) logged in successfully.`;
    logger.info(logMessage);
    return res.status(200).json({ message: "Login logged successfully." });
};

module.exports = {
    getAllRecords, getShowJobUsers, userCreate, Login, deleteUser, updateUser, updateShowUser, uploadFile, logLogin, deleteAllUsers
};