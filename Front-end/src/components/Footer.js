// src/components/Footer.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 2, mt: 'auto', bgcolor: 'background.paper', textAlign: 'center' }}>
      <Typography variant="body1">
        © 2024 My Application
      </Typography>
    </Box>
  );
};

export default Footer;
