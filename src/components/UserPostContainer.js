import React from 'react';
import { Post, PostSkeleton } from '.';

import Grid from '@mui/material/Grid';

const UserPostContainer = ({ posts, loading, postIdParam }) => {
  return (
    <Grid item sm={8} xs={12}>
      {loading ? (
        <PostSkeleton />
      ) : !posts ? (
        <p>No posts from this user</p>
      ) : !postIdParam ? ( //if there is not postId parameter given, then render all user posts as usual
        posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      ) : (
        //but if there is postId parameter
        posts.map((post) => {
          if (post._id !== postIdParam) {
            //and it does not match
            return <Post key={post._id} post={post} />; //then return post as usual
          } else {
            //but if it does match
            return <Post key={post._id} post={post} openDialog />; //then pass openDialog prop (true) to the post
          }
        })
      )}
    </Grid>
  );
};

export default UserPostContainer;
