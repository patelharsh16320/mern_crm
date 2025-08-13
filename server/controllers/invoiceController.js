const conn = require('../utils/db');

//! *************** Invoice API start 
// create new Invoice 
const createInvoice = async (req, res) => {
    try {
        const { user_id, invoice_number, order_number, user_name, payment_method, subtotal, shipping, total, invoice_date } = req.body;

        if (!user_id || !invoice_number || !order_number || !user_name || !payment_method || !subtotal || !shipping || !total || !invoice_date) {
            return res.status(400).json({ message: "Please provide all required details" });
        }

        const sql = ` INSERT INTO invoice ( user_id, invoice_number, order_number, user_name, payment_method, subtotal, shipping, total, invoice_date ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) `;

        const values = [user_id, invoice_number, order_number, user_name, payment_method, subtotal, shipping, total, invoice_date];

        conn.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: "Database error" });
            }

            return res.status(201).json({
                message: "Invoice created successfully.",
                invoice_id: result.insertId
            });
        });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ message: "Internal server error on createInvoice" });
    }
};

// update new Invoice 
const updateInvoice = async (req, res) => {
    try {
        const { invoice_id, user_id, invoice_number, order_number, user_name, payment_method, subtotal, shipping, total, invoice_date } = req.body;

        // Validate required fields
        if (!invoice_id || !user_id || !invoice_number || !order_number || !user_name || !payment_method || subtotal || !shipping || !total || !invoice_date) {
            return res.status(400).json({ message: "All invoice fields are required including invoice_id" });
        }

        const sql = ` UPDATE invoice SET user_id = ?, invoice_number = ?, order_number = ?, user_name = ?, ayment_method = ?, subtotal = ?, shipping = ?, total = ?, invoice_date = ? WHERE invoice_id = ? `;

        const values = [user_id, invoice_number, order_number, user_name, payment_method, subtotal, shipping, total, invoice_date, invoice_id];

        conn.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({
                    message: "Invoice update failed",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Invoice not found" });
            }

            return res.status(200).json({ message: "Invoice updated successfully" });
        });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            message: "Internal server error on updateInvoice",
            error: error.message
        });
    }
};

// Delete Invoice
const deleteInvoice = async (req, res) => {
    try {
        const InvoiceId = req.params.id;

        if (!InvoiceId) {
            res.json({ message: 'Invoice id is required', statusCode: 400 });
        }
        const query = `DELETE FROM invoice WHERE invoice_id = ?`;

        conn.query(query, [InvoiceId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'Invoice not found', statusCode: 404 });
            } else {
                res.json({ message: 'Invoice deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on delete Invoice', statusCode: 500 });
    }
}

// Delete All Invoice
const deleteAllInvoice = async (req, res) => {
    try {
        const query = `DELETE FROM invoice WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Invoice are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete Invoice', statusCode: 500 });
    }
}

// Get Single Invoice by ID
const SingleInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) { return res.status(400).json({ message: "Invoice ID is required" }); }

        const sql = `SELECT * FROM invoice WHERE invoice_id = ?`;
        conn.query(sql, [id], (err, results) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: 'Database error' });
            }
            if (!results.length) { return res.status(404).json({ message: 'Invoice not found' }); }

            res.status(200).json({ message: "Invoice fetched successfully", data: results[0] });
        });

    } catch (err) {
        console.error("Internal Error:", err);
        res.status(500).json({ message: 'Internal server error on SingleInvoice' });
    }
};

//! *************** Invoice API End 

module.exports = {
    createInvoice, updateInvoice, deleteInvoice, deleteAllInvoice, SingleInvoice
};