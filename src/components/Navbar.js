import React from 'react';

import { Link } from 'react-router-dom';

// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        <Button color='inherit' component={Link} to='/login'>
          Login
        </Button>
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>
        <Button color='inherit' component={Link} to='/register'>
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
