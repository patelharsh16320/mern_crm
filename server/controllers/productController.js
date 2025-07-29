const conn = require('../utils/db');

//! *************** Product API Start 
// Create new Product
const createProduct = async (req, res) => {
    try {
        const { name, desc, image_url, stock, price, sell_price, rating } = req.body;

        if (!name || !desc || !image_url || stock == null || price == null || sell_price == null || rating == null) {
            return res.status(400).json({
                message: "Missing required product details",
                statusCode: 400
            });
        }

        const sql = ` INSERT INTO product ( name, \`desc\`, image_url, stock, price, sell_price, rating, created_at, modified_at, deleted_at ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NULL, NULL)        `;

        const values = [name, desc, image_url, stock, price, sell_price, rating];

        conn.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(409).json({
                    message: "Product insert failed",
                    statusCode: 100
                });
            }

            return res.status(201).json({
                message: "Product created successfully",
                statusCode: 201,
                product_id: result.insertId
            });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error while creating product",
            statusCode: 500
        });
    }
};

// update new Product
const updateProduct = async (req, res) => {
    try {
        const {
            product_id,
            name,
            desc,
            image_url,
            stock,
            price,
            sell_price,
            rating,
            created_at,
            modified_at,
            deleted_at
        } = req.body;

        // Validation
        if (!product_id) {
            return res.json({ message: "Product ID is required", statusCode: 400 });
        }

        const sql = `UPDATE product SET 
            name = ?, 
            \`desc\` = ?, 
            image_url = ?, 
            stock = ?, 
            price = ?, 
            sell_price = ?, 
            rating = ?, 
            created_at = ?, 
            modified_at = ?, 
            deleted_at = ? 
            WHERE product_id = ?`;

        const values = [
            name,
            desc,
            image_url,
            stock,
            price,
            sell_price,
            rating,
            created_at,
            modified_at,
            deleted_at,
            product_id
        ];

        conn.query(sql, values, (err, result) => {
            if (err) {
                return res.json({
                    message: "Failed to update product",
                    statusCode: 100,
                    error: err.message
                });
            }

            return res.json({
                message: "Product updated successfully.",
                statusCode: 200
            });
        });

    } catch (error) {
        return res.json({
            message: "Internal server error while updating product",
            statusCode: 500,
            error: error.message
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            res.json({ message: 'product id is required', statusCode: 400 });
        }
        const query = `DELETE FROM product WHERE product_id = ?`;

        conn.query(query, [productId], (err, result) => {
            if (result.affectedRows === 0) {
                res.json({ message: 'product not found', statusCode: 404 });
            } else {
                res.json({ message: 'product deleted successfully', statusCode: 200 });
            }
        });

    } catch (err) {
        res.json({ message: 'Internal server error on delete product', statusCode: 500 });
    }
}

// Delete All Product
const deleteAllProduct = async (req, res) => {
    try {
        const query = `DELETE FROM product WHERE 1`;
        conn.query(query, (err, result) => {
            res.json({ message: 'All Product are deleted successfully', statusCode: 200 });
        })

    } catch (err) {
        res.json({ message: 'Internal server error on delete product', statusCode: 500 });
    }
}

//! *************** Product API End 

//! *************** Product Category API Start 
const createCategory = async (req, res) => {
    try {
        const { name, desc } = req.body;
        if (!name || !desc) {
            return res.status(400).json({
                message: "Missing required category details",
                statusCode: 400
            });
        }

        const sql = `
            INSERT INTO product_category 
            (name, \`desc\`, created_at, modified_at, deleted_at) 
            VALUES (?, ?, NOW(), NULL, NULL)
        `;
        const values = [name, desc];

        conn.query(sql, values, (err, result) => {
            if (err) {
                return res.status(409).json({
                    message: "Category insert failed",
                    statusCode: 100,
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Category created successfully",
                statusCode: 201,
                category_id: result.insertId
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error on createCategory",
            statusCode: 500,
            error: error.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { category_id, name, desc } = req.body;

        if (!category_id || !name || !desc) {
            return res.status(400).json({
                message: "Category ID, name, and desc are required",
                statusCode: 400
            });
        }

        const sql = `
            UPDATE product_category SET 
            name = ?, 
            \`desc\` = ?, 
            modified_at = NOW() 
            WHERE category_id = ?
        `;
        const values = [name, desc, category_id];

        conn.query(sql, values, (err, result) => {
            if (err) {
                return res.status(409).json({
                    message: "Category update failed",
                    statusCode: 100,
                    error: err.message
                });
            }

            res.status(200).json({
                message: "Category updated successfully",
                statusCode: 200
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error on updateCategory",
            statusCode: 500,
            error: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required', statusCode: 400 });
        }

        const query = `DELETE FROM product_category WHERE category_id = ?`;

        conn.query(query, [categoryId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Deletion failed', statusCode: 500 });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Category not found', statusCode: 404 });
            }

            res.status(200).json({ message: 'Category deleted successfully', statusCode: 200 });
        });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error on deleteCategory', statusCode: 500 });
    }
};

const deleteAllCategories = async (req, res) => {
    try {
        const query = `DELETE FROM product_category WHERE 1`;

        conn.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting all categories', statusCode: 500 });
            }

            res.status(200).json({ message: 'All categories deleted successfully', statusCode: 200 });
        });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error on deleteAllCategories', statusCode: 500 });
    }
};

//! *************** Product Category API End 
module.exports = {
    //* Product
    createProduct, updateProduct, deleteProduct, deleteAllProduct,
    //* Product Category
    createCategory, updateCategory, deleteCategory, deleteAllCategories
};