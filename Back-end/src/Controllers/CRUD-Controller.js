// Function for getting one project
async function GetAllProduct(req, res, connection) {
  try {
    const [rows] = await connection.execute('SELECT * FROM products ');
    
    if (rows.length === 0) {
      res.json({ msg: "product not found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Error fetching project');
  }
}

// Function for getting one product
async function GetOneProduct(req, res, connection) {
  const { product_id } = req.params;

  try {
    const [rows] = await connection.execute('SELECT * FROM products WHERE product_id = ?', [product_id]);

    if (rows.length === 0) {
      res.json({ msg: "Product not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Error fetching product');
  }
}

// Function for creating a new product
async function CreateNewProduct(req, res, connection) {
  try {
    const { product_name, product_price, product_amount } = req.body;

    // Ensure all required fields are provided
    if (!product_name || product_price === undefined || product_amount === undefined) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    // Execute the insert query
    const [result] = await connection.execute(
      "INSERT INTO products (product_name, product_price, product_amount) VALUES (?, ?, ?)",
      [product_name, product_price, product_amount]
    );

    // Send a response with the inserted product ID
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ msg: 'Error creating product' });
  }
}

// Function for updating a product
async function UpdateProduct(req, res, connection) {
  try {
    const { product_id, product_name, product_price, product_amount } = req.body;

    // Ensure the product_id and at least one other field is provided
    if (!product_id || (product_name === undefined && product_price === undefined && product_amount === undefined)) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    // Build the update query dynamically based on provided fields
    const fields = [];
    const values = [];

    if (product_name !== undefined) {
      fields.push("product_name = ?");
      values.push(product_name);
    }
    if (product_price !== undefined) {
      fields.push("product_price = ?");
      values.push(product_price);
    }
    if (product_amount !== undefined) {
      fields.push("product_amount = ?");
      values.push(product_amount);
    }

    values.push(product_id); // Add product_id to the end for the WHERE clause

    const query = `UPDATE products SET ${fields.join(", ")} WHERE product_id = ?`;

    const [result] = await connection.execute(query, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ msg: 'Product not found' });
    } else {
      res.json({ msg: 'Product updated successfully' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ msg: 'Error updating product' });
  }
}

// Function for deleting a product
async function DeleteProduct(req, res, connection) {
  try {
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ msg: 'Missing required field: product_id' });
    }

    const [result] = await connection.execute('DELETE FROM products WHERE product_id = ?', [product_id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ msg: 'Product not found' });
    } else {
      res.json({ msg: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ msg: 'Error deleting product' });
  }
}

module.exports = {
  GetAllProduct,
  GetOneProduct,
  CreateNewProduct,
  UpdateProduct,
  DeleteProduct,
};
