// src/App.js
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from './components/TopBar';
import SideBar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <TopBar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <SideBar />
        <Content />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
