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
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { CustomButton } from '.';

import { useUserContext } from '../context/userContext';
import { useDataContext } from '../context/dataContext';

const Post = ({ post }) => {
  dayjs.extend(relativeTime);

  const { userData, likes } = useUserContext();
  const { likePost, unLikePost } = useDataContext();

  /**
   * Check if we have likes array and if we have liked the post or not.
   * @returns {Boolean} true or false
   */
  const likedPost = () => {
    if (likes && likes.find((like) => like.postId === post._id)) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Returns like ID number from likes array (originated in userContext).
   * @param {String} postId Given post ID
   * @returns {String} like ID number
   */
  const getLikeId = (postId) => {
    return likes.find((like) => like.postId === postId)._id;
  };

  /**
   * Like post - we get the function from dataContext
   * @param {String} postId Given post ID
   */
  const clickLike = (postId) => {
    if (!likedPost()) {
      likePost(postId);
    }
  };

  /**
   * Unlike post - we get the function from dataContext
   * @param {String} postId Given post ID
   */
  const clickUnlike = (postId) => {
    if (likedPost()) {
      unLikePost(postId, getLikeId(postId));
    }
  };
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
   * Like button logic. Depends if we have liked the post or not, button design changes.
   */
  const likeButton = !userData ? (
    <CustomButton tip='like'>
      <Link to='/login'>
        <FavoriteBorder color='primary' />
      </Link>
    </CustomButton>
  ) : likedPost() ? (
    <CustomButton tip='Unlike' onClick={() => clickUnlike(postId)}>
      <FavoriteIcon color='primary' />
    </CustomButton>
  ) : (
    <CustomButton tip='Like' onClick={() => clickLike(postId)}>
      <FavoriteBorder color='primary' />
    </CustomButton>
  );

  return (
    <Wrapper>
      <Card className='card'>
        <div className='img-container'>
          <img src={`http://localhost:5000/${image}`} alt='user' />
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
          <Typography className='date' variant='body2'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{message}</Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          <CustomButton tip='comments'>
            <ChatIcon color='primary' />
          </CustomButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .card {
    display: flex;
    margin-bottom: 20px;
  }
  .img-container {
    width: 150px;
    padding: 10px;
  }
  .img-container img {
    width: 100%;
    object-fit: cover;
  }
  .content {
    padding: 25px;
  }
  .date {
    color: hsl(210, 31%, 80%);
  }
`;

export default Post;
