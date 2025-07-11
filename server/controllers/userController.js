const conn = require('../utils/db');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

// Apply for job
const CreateApplyForJob = async (req, res) => {
    try {
        const { company_name, user_name, position_name, resume } = req.body;

        console.log('company_name:', company_name);
        console.log('user_name:', user_name);
        console.log('position_name:', position_name);
        console.log('resume:', resume);

        // Check if all required fields are present
        if (!company_name || !user_name || !position_name || !resume) {
            console.log('All fields are required');
            return res.status(400).json({ message: "All fields are required", statusCode: 400 });
        }

        // SQL Query (exclude `id` since it's auto-increment)
        const insertSql = `
            INSERT INTO job_apply_list 
            (company_name, user_name, position_name, resume, created_at) 
            VALUES (?, ?, ?, ?, NOW())`;

        console.log('insertSql:', insertSql);

        // Execute Query
        conn.query(insertSql, [company_name, user_name, position_name, resume], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: "Database error", statusCode: 500, error: err.message });
            }
            return res.status(200).json({
                message: "Applied for job successfully",
                statusCode: 200,
                data: { id: result.insertId, company_name, user_name, position_name, resume }
            });
        });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ message: "Internal server error", statusCode: 500, error: error.message });
    }
};


// Delete Apply for job Profile
const deleteApplyForJob = async (req, res) => {
    try {
        const companyId = req.params.id;

        if (!companyId) {
            res.json({ message: 'Company id is required', statusCode: 400 });
        }
        const query = `DELETE FROM job_apply_list WHERE id = ?`;
        conn.query(query, [companyId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'Company not found', statusCode: 404 });
            } else {
                res.json({ message: 'Company deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on delete Company', statusCode: 500 });
    }
}


// Delete All Apply for job Profile
const deleteAllApplyForJob = async (req, res) => {
    try {
        const query = `DELETE FROM job_apply_list WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Apply list are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

module.exports = {
    CreateApplyForJob, deleteApplyForJob, deleteAllApplyForJob
};
