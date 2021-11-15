import React from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '.';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useUserContext } from '../context/userContext';
import { useDataContext } from '../context/dataContext';

const LikeButton = ({ postId, post }) => {
  const { user, likes } = useUserContext();
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

  /**
   * Like button logic. Depends if we have liked the post or not, button design changes.
   */
  const likeButton = !user ? (
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

  return likeButton;
};

export default LikeButton;
