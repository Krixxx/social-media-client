import React from 'react';

import { CustomButton, CreatePost } from '../components';

import { Link } from 'react-router-dom';

// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import Notifications from '@mui/icons-material/Notifications';

import { useUserContext } from '../context/userContext';

const Navbar = () => {
  const { user } = useUserContext();

  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {user ? (
          <>
            <CreatePost />
            <Link to='/'>
              <CustomButton tip='Home'>
                <HomeIcon />
              </CustomButton>
            </Link>
            <CustomButton tip='Notifications'>
              <Notifications />
            </CustomButton>
          </>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/'>
              Home
            </Button>
            <Button color='inherit' component={Link} to='/register'>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
