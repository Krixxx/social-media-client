import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CustomButton, LikeButton, Comments, CommentForm } from '.';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
//Icons
import CloseIcon from '@mui/icons-material/Close';
import UnfoldMore from '@mui/icons-material/UnfoldMore';
import ChatIcon from '@mui/icons-material/Chat';

import { useDataContext } from '../context/dataContext';

const PostDialog = ({ postId, userId, createdBy, openDialog }) => {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');

  const {
    getSinglePost,
    isLoadingUI,
    post,
    comments,
    getAllCommentsOnPost,
    clearComments,
  } = useDataContext();

  const { message, createdAt, likeCount, commentCount, image, userHandle } =
    post;

  const handleOpen = () => {
    // we set oldPath state, which is current path
    let currentPath = window.location.pathname;

    // new path is our userId and postId
    const path = `/users/${createdBy}/post/${postId}`;

    if (currentPath === path) {
      currentPath = `/users/${createdBy}`;
    }
    // show our new path
    window.history.pushState(null, null, path);

    // set current path to state, so we can use it in handleClose
    setOldPath(currentPath);

    setOpen(true);
    getSinglePost(postId);
    getAllCommentsOnPost(postId);
  };

  const handleClose = () => {
    // when we close dialog, show again our old path
    window.history.pushState(null, null, oldPath);

    setOpen(false);
    clearComments();
  };

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [openDialog]);

  return (
    <>
      <CustomButton
        onClick={handleOpen}
        tip='Expand post'
        tipClassName='expand-button'
      >
        <UnfoldMore color='primary' />
      </CustomButton>
      {open && (
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
                <div className='spinner-div'>
                  <CircularProgress thickness={2} size={150} />
                </div>
              ) : (
                <Grid container>
                  <Grid item sm={4}>
                    <div className='post-img-container'>
                      <img src={image} alt='Profile' />
                    </div>
                  </Grid>
                  <Grid item sm={5}>
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
                    <LikeButton postId={postId} post={post} />
                    <span>
                      {likeCount}{' '}
                      {likeCount > 1 || likeCount === 0 ? 'likes' : 'like'}
                    </span>
                    <CustomButton tip='comments'>
                      <ChatIcon color='primary' />
                    </CustomButton>
                    <span>
                      {commentCount}{' '}
                      {commentCount > 1 || commentCount === 0
                        ? 'comments'
                        : 'comment'}
                    </span>
                  </Grid>
                  <hr className='visible-separator' />
                  <CommentForm postId={postId} />
                  <Comments comments={comments} />
                </Grid>
              )}
            </DialogContent>
          </Wrapper>
        </Dialog>
      )}
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
  .post-dialog-hr {
    border: none;
    margin: 4px;
  }
  .close-btn {
    position: absolute;
    left: 91%;
    top: 6%;
  }
  .spinner-div {
    text-align: center;
    margin: 30px auto;
  }
`;

export default PostDialog;
