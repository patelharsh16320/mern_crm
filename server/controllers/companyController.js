const conn = require('../utils/db');

//! *************** Company API start 
// create new company 
const createComapny = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) { return res.json({ message: "Please provide a name", statusCode: 400 }); }

        const sql = "INSERT INTO `company`(`name`) VALUES (?)";

        conn.query(sql, [name], (err, result) => {
            if (err) {
                return res.json({ message: "Company alredy exist...!, try other one.", statusCode: 100, });
            }
            return res.json({ message: "Company created successfully", statusCode: 200, companyId: result.insertId });
        });
    } catch (error) {
        return res.json({ message: "Internal server error on create company", statusCode: 500 });
    }
};

// Delete company
const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        if (!companyId) {
            res.json({ message: 'Company id is required', statusCode: 400 });
        }
        const query = `DELETE FROM company WHERE id = ?`;
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

// update new company 
const updateCompany = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!name || !id) { return res.json({ message: "Company ID and name are required", statusCode: 400 }); }
        const sql = `UPDATE company SET name=? WHERE id=?`;

        conn.query(sql, [name, id], (err, result) => {
            if (err) { return res.json({ message: "Company name is already exist...!, try one name", statusCode: 100, error: err.message }); }
            res.json({ message: "Company updated successfully.", statusCode: 200 });
        });
    } catch (error) { return res.json({ message: "Internal server error on create company", statusCode: 500 }); }
};

// Delete All Companys
const deleteAllCompanys = async (req, res) => {
    try {
        const query = `DELETE FROM company WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Users are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

//! *************** Company API End 


//! *************** Company Profile API start 
// Delete company Profile
const deleteCompanyProfile = async (req, res) => {
    try {
        const companyId = req.params.id;

        if (!companyId) {
            res.json({ message: 'Company id is required', statusCode: 400 });
        }
        const query = `DELETE FROM company_profile WHERE id = ?`;
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

// create company profile
const createCompanyProfile = async (req, res) => {
    try {
        const { name, description, url, image } = req.body;

        if (!name || !description || !url || !image) {
            return res.json({ message: "All fields are required", statusCode: 400 });
        }

        // Check if the company name already exists
        const checkSql = "SELECT id FROM `company_profile` WHERE name = ?";
        conn.query(checkSql, [name], (err, results) => {
            if (err) {
                return res.json({ message: "Database error", statusCode: 500, error: err.message });
            }
            if (results.length > 0) {
                return res.json({ message: "Company name already exists", statusCode: 100 });
            }

            // If name doesn't exist, insert the new record
            const insertSql = "INSERT INTO `company_profile`(`name`, `description`, `url`, `image`) VALUES (?, ?, ?, ?)";
            conn.query(insertSql, [name, description, url, image], (err, result) => {
                if (err) {
                    return res.json({ message: "Failed to create company profile", statusCode: 500, error: err.message });
                }
                return res.json({ message: "Company profile created successfully", statusCode: 200, data: result });
            });
        });

    } catch (error) {
        return res.json({ message: "Internal server error", statusCode: 500 });
    }
};

// update new company profile
const updateCompanyProfile = async (req, res) => {
    try {
        const { id, name, description, url, image } = req.body;

        if (!name || !description || !url || !image) {
            return res.json({ message: "Company profile details are required", statusCode: 400 });
        }

        // Check if the name already exists (excluding the current ID)
        const checkSql = "SELECT id FROM `company_profile` WHERE name = ? AND id != ?";
        conn.query(checkSql, [name, id], (err, results) => {
            if (err) {
                return res.json({ message: "Database error", statusCode: 500 });
            }
            if (results.length > 0) {
                return res.json({ message: "Company Profile Already exists! Try another name.", statusCode: 100 });
            }

            // Proceed with the update if no duplicate name found
            const updateSql = "UPDATE `company_profile` SET name=?, description=?, url=?, image=? WHERE id=?";
            conn.query(updateSql, [name, description, url, image, id], (err, result) => {
                if (err) {
                    return res.json({ message: "Database error", statusCode: 500 });
                }
                return res.json({ message: "Company Profile updated successfully.", statusCode: 200 });
            });
        });
    } catch (error) {
        return res.json({ message: "Internal server error on updating company", statusCode: 500 });
    }
};

// Delete All Users
const deleteAllJobsprofiles = async (req, res) => {
    try {
        const query = `DELETE FROM company_profile WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Users are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

//! *************** Company Profile API End 

//! *************** Job Position API Start
// Delete company Profile
const deleteJobProfile = async (req, res) => {
    try {
        const companyId = req.params.id;

        if (!companyId) {
            res.json({ message: 'Company id is required', statusCode: 400 });
        }
        const query = `DELETE FROM job_position WHERE id = ?`;
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

// create company profile
const createJobPosition = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ message: "Name field is required", statusCode: 400 });
        }

        // Check if the company name already exists
        const checkSql = "SELECT id FROM `job_position` WHERE name = ?";
        conn.query(checkSql, [name], (err, results) => {
            if (err) {
                return res.json({ message: "Database error", statusCode: 500, error: err.message });
            }
            if (results.length > 0) {
                return res.json({ message: "Job Position already exists...! Try other name", statusCode: 100 });
            }

            // If name doesn't exist, insert the new record
            const insertSql = "INSERT INTO `job_position`(`name`) VALUES (?)";
            conn.query(insertSql, [name], (err, result) => {
                if (err) {
                    return res.json({ message: "Failed to create job position", statusCode: 500, error: err.message });
                }
                return res.json({ message: "Job profile created successfully", statusCode: 200, data: result });
            });
        });

    } catch (error) {
        return res.json({ message: "Internal server error", statusCode: 500 });
    }
};

// update new company profile
const updateJobPosition = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!name) {
            return res.json({ message: "Job profile Details are required", statusCode: 400 });
        }
        const sql = "UPDATE `job_position` SET name=? WHERE id=?";

        conn.query(sql, [name, id], (err, result) => {
            if (name.length > 0) {
                return res.json({ message: "Job profile already exist...! Try other one.", statusCode: 100 });
            }
            res.json({ message: "Job Profile updated successfully.", statusCode: 200 });
        });
    } catch (error) { return res.json({ message: "Internal server error on Job profile Update", statusCode: 500 }); }
};

// Delete All Users
const deleteAllJobsPositions = async (req, res) => {
    try {
        const query = `DELETE FROM job_position WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Users are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete user', statusCode: 500 });
    }
}

//! *************** Job Position API End

//! *************** Crate Job Start
// create company profile
const createNewJob = async (req, res) => {
    try {
        const { company_name, role, description, skills, salary, job_type, experience, location, posted_by } = req.body;
        if (!company_name || !role || !description || !skills || !salary || !job_type || !experience || !location) {
            return res.json({ message: "All fields are required", statusCode: 400 });
        }

        // Check if the company_name already exists
        const checkSql = "SELECT id FROM `job_create_list` WHERE company_name = ?";
        conn.query(checkSql, [company_name], (err, results) => {
            const insertSql = `
                    INSERT INTO job_create_list 
                    (company_name, role, description, skills, salary, job_type, experience,location, posted_by, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, NOW())`;

            conn.query(insertSql, [company_name, role, description, skills, salary, job_type, experience, location, posted_by], (err, result) => {
                return res.json({ message: "Job created successfully", statusCode: 200, data: result });
            });
        });

    } catch (error) {
        return res.json({ message: "Internal server error", statusCode: 500, error: error.message });
    }
};

// update new company profile
const updateNewJob = async (req, res) => {
    try {
        const { id, company_name, role, description, skills, salary, job_type, experience, location, posted_by } = req.body;
        // console.log('posted_by', posted_by);

        if (!id || !company_name || !role || !description || !skills || !salary || !job_type || !experience || !posted_by || !location) {
            return res.json({ message: "All fields are required", statusCode: 400 });
        }

        const checkCompanySql = "SELECT name FROM `company` WHERE name = ?";
        conn.query(checkCompanySql, [company_name], (err, companyResults) => {
            if (err) {
                return res.json({ message: "Database error", statusCode: 500, error: err.message });
            }
            if (companyResults.length === 0) {
                return res.json({ message: `Company '${company_name}' does not exist`, statusCode: 400 });
            }

            const checkSql = "SELECT id FROM `job_create_list` WHERE id = ?";
            conn.query(checkSql, [id], (err, jobResults) => {
                if (err) {
                    return res.json({ message: "Database error", statusCode: 500, error: err.message });
                }
                if (jobResults.length === 0) {
                    return res.json({ message: "Job profile not found", statusCode: 404 });
                }

                const sql = "UPDATE `job_create_list` SET company_name=?, role=?, description=?, skills=?, salary=?, job_type=?, experience=?, location=?, posted_by=? WHERE id = ?";
                conn.query(sql, [company_name, role, description, skills, salary, job_type, experience, location, posted_by, id], (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.json({ message: "Failed to update job profile", statusCode: 500, error: err.message });
                    }
                    res.json({ message: "Job Profile updated successfully.", statusCode: 200 });
                });
            });
        });

    } catch (error) {
        return res.json({ message: "Internal server error on Job profile update", statusCode: 500, error: error.message });
    }
};

// Delete company Profile
const deleteCreateJob = async (req, res) => {
    try {
        const companyId = req.params.id;

        if (!companyId) {
            res.json({ message: 'Job id is required', statusCode: 400 });
        }
        const query = `DELETE FROM job_create_list WHERE id = ?`;
        conn.query(query, [companyId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'Job not found', statusCode: 404 });
            } else {
                res.json({ message: 'Job deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on Job Delete', statusCode: 500 });
    }
}

// Delete All Users
const deleteAllCreateJob = async (req, res) => {
    try {
        const query = `DELETE FROM job_create_list WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Jobs are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete Jobs', statusCode: 500 });
    }
}
//! *************** Crate Job End

module.exports = {
    createComapny, deleteCompany, updateCompany, deleteCompanyProfile, createCompanyProfile, updateCompanyProfile, deleteJobProfile, createJobPosition, updateJobPosition, deleteAllJobsPositions, deleteAllCompanys, deleteAllJobsprofiles, createNewJob, updateNewJob, deleteCreateJob, deleteAllCreateJob
};