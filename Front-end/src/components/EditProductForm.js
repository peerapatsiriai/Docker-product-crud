import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditProductForm = ({ product, onSave, onCancel }) => {
  const [product_name, setProductName] = useState(product.product_name);
  const [product_price, setProductPrice] = useState(product.product_price);
  const [product_amount, setProductAmount] = useState(product.product_amount);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    onSave({ ...product, product_name, product_price, product_amount });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={product_price}
          onChange={(e) => setProductPrice(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Amount"
          fullWidth
          type="number"
          value={product_amount}
          onChange={(e) => setProductAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditProductForm;
