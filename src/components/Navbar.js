import React from 'react';

import { CustomButton, CreatePost, Notifications } from '../components';

import { Link } from 'react-router-dom';

// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

// Icons
import HomeIcon from '@mui/icons-material/Home';

import { useUserContext } from '../context/userContext';

const Navbar = () => {
  const { user, page, setPage } = useUserContext();

  const setHomePage = () => {
    if (page !== 0) {
      setPage(0);
    }
  };

  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {user ? (
          <>
            <CreatePost />
            <Link to='/'>
              <CustomButton tip='Home' onClick={setHomePage}>
                <HomeIcon />
              </CustomButton>
            </Link>

            <Notifications />
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
