import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomButton } from '.';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
//Icons
import CloseIcon from '@mui/icons-material/Close';
import UnfoldMore from '@mui/icons-material/UnfoldMore';

import { useDataContext } from '../context/dataContext';

const PostDialog = ({ postId, userId }) => {
  const [open, setOpen] = useState(false);

  const { getSinglePost, isLoadingUI, post } = useDataContext();

  const {
    // _id: id,
    message,
    createdAt,
    // likeCount,
    // commentCount,
    image,
    userHandle,
  } = post;

  const handleOpen = () => {
    setOpen(true);
    getSinglePost(postId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButton
        onClick={handleOpen}
        tip='Expand post'
        tipClassName='expand-button'
      >
        <UnfoldMore color='primary' />
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
          <DialogContent className='post-dialog-content'>
            {isLoadingUI ? (
              <CircularProgress className='post-dialog-loader' size={150} />
            ) : (
              <Grid container spacing={16}>
                <Grid item sm={5}>
                  <div className='post-img-container'>
                    <img src={image} alt='Profile' />
                  </div>
                </Grid>
                <Grid item sm={7}>
                  <Typography
                    component={Link}
                    color='primary'
                    variant='h5'
                    to={`/users/${userId}`}
                  >
                    @{userHandle}
                  </Typography>
                  <hr className='post-dialog-hr' />
                  <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).format('H:mm, DD MMMM YYYY')}
                  </Typography>
                  <hr className='post-dialog-hr' />
                  <Typography variant='body1'>{message}</Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
        </Wrapper>
      </Dialog>
    </>
  );
};

const Wrapper = styled.div`
  .post-img-container {
    width: 150px;
    height: 150px;
    padding: 10px;
  }
  .post-img-container img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .post-dialog-content {
    padding: 20px;
  }
  .post-dialog-hr {
    border: none;
    margin: 4px;
  }
`;

export default PostDialog;
