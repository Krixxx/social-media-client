import React, { useState } from 'react';
import styled from 'styled-components';

import { CustomButton } from '.';

import { useDataContext } from '../context/dataContext';

// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

const DeletePost = ({ postId }) => {
  const [open, setOpen] = useState(false);

  const { deletePost: deleteCurrentPost } = useDataContext();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = () => {
    deleteCurrentPost(postId);
    setOpen(false);
  };

  return (
    <Wrapper>
      <CustomButton
        tip='Delete Post'
        onClick={handleOpen}
        btnClassName='deleteBtn'
      >
        <DeleteOutline color='secondary' />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={deletePost} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 90%;
`;

export default DeletePost;
