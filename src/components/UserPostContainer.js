import React from 'react';
import { Post } from '.';

import Grid from '@mui/material/Grid';

const UserPostContainer = ({ posts, loading }) => {
  return (
    <Grid item sm={8} xs={12}>
      {loading ? (
        <p>Loading data...</p>
      ) : !posts ? (
        <p>No posts from this user</p>
      ) : (
        posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      )}
    </Grid>
  );
};

export default UserPostContainer;
