import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';

import { CustomButton, DeletePost, PostDialog, LikeButton } from '.';

import { useUserContext } from '../context/userContext';

const Post = ({ post, openDialog }) => {
  dayjs.extend(relativeTime);

  const { user, userData } = useUserContext();

  const {
    message,
    createdAt,
    image,
    userHandle,
    _id: postId,
    commentCount,
    likeCount,
    createdBy,
  } = post;

  /**
   * Delete button logic. null, if user is not logged in our post is not created by logged in user
   */
  // const deleteButton =

  return (
    <Wrapper>
      {userData ? (
        <Card className='card'>
          <div className='img-container'>
            <img src={image} alt='user' />
          </div>
          <CardContent className='content'>
            <Typography
              className='handle'
              variant='h5'
              color='primary'
              component={Link}
              to={`/users/${createdBy}`}
            >
              {userHandle}
            </Typography>
            {user && createdBy === userData._id ? (
              <DeletePost postId={postId} />
            ) : null}
            <Typography className='date' variant='body2'>
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant='body1'>{message}</Typography>
            <LikeButton postId={postId} post={post} />
            <span>
              {likeCount} {likeCount > 1 || likeCount === 0 ? 'likes' : 'like'}
            </span>
            <CustomButton tip='comments'>
              <ChatIcon color='primary' />
            </CustomButton>
            <span>
              {commentCount}{' '}
              {commentCount > 1 || commentCount === 0 ? 'comments' : 'comment'}
            </span>
            <PostDialog
              postId={postId}
              createdBy={createdBy}
              userId={userData._id}
              openDialog={openDialog}
            />
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .card {
    display: flex;
    margin-bottom: 10px;
    position: relative;
  }
  .img-container {
    width: 150px;
    max-height: 150px;
    padding: 10px;
  }
  .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .date {
    color: hsl(210, 31%, 80%);
  }
`;

export default Post;
