import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';

import { useUserContext } from '../context/userContext';

const EditDetails = () => {
  const { userData, updateUser } = useUserContext();

  const [user, setUser] = useState({
    location: '',
    website: '',
    image: '',
  });

  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = (userData) => {
    setUser({
      location: userData.location ? userData.location : '',
      website: userData.website ? userData.website : '',
      image: userData.image ? userData.image : '',
    });
  };

  const handleOpen = () => {
    setOpen(true);

    mapUserDetailsToState(userData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    //   handle multiple inputs, when preserving old state
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
    const userDetails = {
      location: user.location,
      website: user.website,
      image: user.image,
    };

    updateUser(userDetails);

    handleClose();
  };

  return (
    <Wrapper>
      <Tooltip title='Edit details' placement='top'>
        <IconButton onClick={handleOpen} className='button'>
          <Edit color='primary' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='location'
              type='text'
              label='Location'
              variant='standard'
              placeholder='Where you live'
              className='textfield'
              value={user.location}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='website'
              type='text'
              label='Website'
              variant='standard'
              placeholder='Your personal/professional website'
              className='textfield'
              value={user.website}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .textfield {
    margin: 5px auto;
  }
  .button {
    float: right;
  }
`;

export default EditDetails;
