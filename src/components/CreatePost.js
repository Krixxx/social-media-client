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
  const [post, setPost] = useState('');

  const { createPost, isLoadingData: loading } = useDataContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPost('');
  };

  const handleChange = (e) => {
    setPost({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (post !== '') {
      createPost(post);

      if (open && !loading) {
        setPost('');
        setOpen(false);
      }
    }
  };

  //   TODO - cannot style Dialog - find a way!

  return (
    <Wrapper>
      <CustomButton onClick={handleOpen} tip='Create a Post!'>
        <AddIcon />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <div className='contents'>
          <CustomButton tip='Close' onClick={handleClose} className='closeBtn'>
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
                plaseholder='Post your thoughts here!'
                className='textfield'
                onChange={handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='submitBtn'
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress size={30} className='progressBtn' />
                )}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .contents {
    position: relative;
  }
  .closeBtn {
    position: absolute;
    left: 90%;
    top: 5%;
    /* float: right; */
  }
  .submitBtn {
    margin-top: 10px;
    position: relative;
  }
  .textfield {
    margin-top: 10px;
  }
  .progressBtn {
    position: absolute;
  }
`;
export default CreatePost;
