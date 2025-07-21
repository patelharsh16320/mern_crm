const conn = require('../utils/db');

//! *************** Role API start 

// Update Role
const updateRole = (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) return res.status(400).json({ message: "Email and Role are required", statusCode: 400 });

  const sql = `UPDATE role SET role = ? WHERE email = ?`;
  conn.query(sql, [role, email], (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed", statusCode: 500 });
    res.json({ message: "Role updated", statusCode: 200 });
  });
};

// Delete role
const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    if (!roleId) {
      res.json({ message: 'Role id is required', statusCode: 400 });
    }
    const query = `DELETE FROM role WHERE role_id = ?`;

    conn.query(query, [roleId], (err, result) => {
      if (result.affectedRows === 0) {
        res.json({ message: 'role not found', statusCode: 404 });
      } else {
        res.json({ message: 'role deleted successfully', statusCode: 200 });
      }
    });

  } catch (err) {
    res.json({ message: 'Internal server error on delete role', statusCode: 500 });
  }
}

// Delete All Roles
const deleteAllRoles = async (req, res) => {
  try {
    const query = `DELETE FROM role WHERE 1`;
    conn.query(query, (err, result) => {
      res.json({ message: 'All role are deleted successfully', statusCode: 200 });
    })

  } catch (err) {
    res.json({ message: 'Internal server error on delete user', statusCode: 500 });
  }
}

//! *************** Role API End 

module.exports = {
  updateRole, deleteRole, deleteAllRoles
};