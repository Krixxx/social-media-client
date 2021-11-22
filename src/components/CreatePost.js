import React, { useState } from 'react';
import styled from 'styled-components';

import CustomButton from './CustomButton';

// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useDataContext } from '../context/dataContext';

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({ message: '' });
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const { createPost, isLoadingData: loading } = useDataContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const removeError = () => {
    setError('');
    setIsError(false);
  };

  const handleClose = () => {
    setOpen(false);
    setPost({ message: '' });
    removeError();
  };

  const handleChange = (e) => {
    setPost({ message: e.target.value });
    removeError();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (post.message !== '') {
      createPost(post);
      removeError();

      if (!loading) {
        handleClose();
      }
    } else {
      setIsError(true);
      setError('Post cannot be empty!');
    }
  };

  return (
    <>
      <CustomButton onClick={handleOpen} tip='Create a Post!' color='primary'>
        <AddIcon />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <Wrapper>
          <CustomButton
            tip='Close'
            onClick={handleClose}
            tipClassName='close-btn'
          >
            <CloseIcon />
          </CustomButton>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name='message'
                type='text'
                label='Post'
                multiline
                rows='3'
                placeholder='Post your thoughts here!'
                helperText={error}
                error={isError ? true : false}
                className='textfield'
                onChange={handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='submit-btn'
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress size={30} className='progress-spinner' />
                )}
              </Button>
            </form>
          </DialogContent>
        </Wrapper>
      </Dialog>
    </>
  );
};

const Wrapper = styled.div`
  .close-btn {
    position: absolute;
    left: 91%;
    top: 5%;
  }
  .submit-btn {
    margin-top: 10px;
    float: right;
    position: relative;
  }
  .textfield {
    margin-top: 10px;
  }
  .progress-spinner {
    position: absolute;
  }
`;

export default CreatePost;
