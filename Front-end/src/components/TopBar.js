// src/components/TopBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const TopBar = () => {
  // TopBar
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          TopBar
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
