import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';

const SideBar = () => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar sx={{ background: blue[500], justifyContent: 'center' }}>
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h6" noWrap sx={{ color: 'white', p: '10px' }}>
          Product App
        </Typography>
      </Toolbar>
      <List>
        {['Products', '...', '...'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} style={{ textAlign: 'center', borderBottom: '2px solid transparent' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
