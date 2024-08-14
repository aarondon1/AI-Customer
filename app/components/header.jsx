
import { useState } from 'react';
import './styles/Navbar.css';
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#121212' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          AI SUPPORTER
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

