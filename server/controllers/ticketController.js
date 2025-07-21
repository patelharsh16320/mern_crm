const conn = require('../utils/db');

//! *************** ticket API start 
// create new ticket 
const allowedStatuses = ['backlog', 'to_do', 'in_progress', 'on_hold', 'review', 'done'];

const createTicket = async (req, res) => {
    try {
        const { subject, status } = req.body;

        // Validate required fields
        if (!subject || !status) {
            return res.json({ message: "Please provide subject and status", statusCode: 400 });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // SQL insert without ticket_id or dates
        const sql = `INSERT INTO ticket (subject, status, last_updated, created_at) VALUES (?, ?, NOW(), NOW())`;
        const values = [subject, status];

        conn.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ message: "Database error", statusCode: 100 });
            }

            return res.json({
                message: "Ticket created successfully....",
                statusCode: 201,
                ticket_id: result.insertId,
            });
        });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error on create ticket", statusCode: 500 });
    }
};

// update new ticket 
const updateTicket = async (req, res) => {
    try {
        const { ticket_id, subject, status } = req.body;

        if (!ticket_id || !subject || !status) {
            return res.status(400).json({ message: "ticket_id, subject, and status are required" });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const sql = `UPDATE ticket SET subject = ?, status = ?, last_updated = NOW() WHERE ticket_id = ?`;
        const values = [subject, status, ticket_id];

        conn.query(sql, values, (err, result) => {
            if (err) {
                return res.json({
                    message: "Ticket update failed (possibly duplicate subject)",
                    statusCode: 100,
                    error: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Ticket not found" });
            }

            return res.json({ message: "Ticket updated successfully....", statusCode: 200 });
        });
    } catch (error) {
        return res.json({
            message: "Internal server error on update ticket",
            statusCode: 500,
            error: error.message,
        });
    }
};

// Delete ticket
const deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;

        if (!ticketId) {
            res.json({ message: 'tickets id is required', statusCode: 400 });
        }
        const query = `DELETE FROM ticket WHERE ticket_id = ?`;

        conn.query(query, [ticketId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'tickets not found', statusCode: 404 });
            } else {
                res.json({ message: 'tickets deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on delete tickets', statusCode: 500 });
    }
}

// Delete All ticket
const deleteAllTickets = async (req, res) => {
    try {
        const query = `DELETE FROM ticket WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All tickets are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete ticket', statusCode: 500 });
    }
}

//! *************** ticket API End 

module.exports = {
    createTicket, updateTicket, deleteTicket, deleteAllTickets
};