// src/components/AddProductForm.js
import React, {useState,} from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddProductForm = ({ onClose }) => {
  // Define state for form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted:", { name, price, amount });
    // Add New Product
    const url = 'http://localhost:4001/product/'
    try {
      const result = await axios.post(url, {
        "product_name":name, 
        "product_price":price, 
        "product_amount":amount
      })
    } catch (error) {
      alert(error)
    }
    // Close the form after submission
    onClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Amount"
          fullWidth
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
          Add Product
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddProductForm;
