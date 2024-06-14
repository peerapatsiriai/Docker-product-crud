import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';



const Content = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rows, setRows] = useState([]);

  const fetchingDataProduct = async () => {
    axios.get('http://localhost:4001/product')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }

  useEffect(() => {
    fetchingDataProduct();
  }, []);

  const handleAddProductClick = () => {
    setIsAddProductOpen(true);
  };

  const handleEditProductClick = (product) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const handleAddProductClose = () => {
    setIsAddProductOpen(false);
    fetchingDataProduct();
  };

  const handleEditProductClose = () => {
    setIsEditProductOpen(false);
    fetchingDataProduct();
  };

  const handleEditProductSave = async (updatedProduct) => {
    try {
      const url = `http://localhost:4001/product/`
      await axios.put(url, updatedProduct);
      fetchingDataProduct();
    } catch (error) {
      alert(error)
    }
    handleEditProductClose();
  };

  const handleDeleteProduct = async (product_id) => {
    try {
      const url = `http://localhost:4001/product/${product_id}`
      await axios.delete(url)
      fetchingDataProduct();
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Product Table
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddProductClick}>
          Add New Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Product Price ($)</TableCell>
              <TableCell align="right">Product Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.product_id}
                </TableCell>
                <TableCell>{row.product_name}</TableCell>
                <TableCell align="right">{row.product_price}</TableCell>
                <TableCell align="right">{row.product_amount}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" aria-label="edit product" onClick={() => handleEditProductClick(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete product" onClick={() => handleDeleteProduct(row.product_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isAddProductOpen}
        onClose={handleAddProductClose}
        aria-labelledby="add-product-modal"
        aria-describedby="add-product-form"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
          <Typography variant="h6" id="add-product-modal">
            Add Product
          </Typography>
          <AddProductForm onClose={handleAddProductClose} />
        </Box>
      </Modal>
      <Modal
        open={isEditProductOpen}
        onClose={handleEditProductClose}
        aria-labelledby="edit-product-modal"
        aria-describedby="edit-product-form"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
          <Typography variant="h6" id="edit-product-modal">
            Edit Product
          </Typography>
          {selectedProduct && <EditProductForm product={selectedProduct} onSave={handleEditProductSave} onCancel={handleEditProductClose} />}
        </Box>
      </Modal>
    </Box>
  );
};

export default Content;
