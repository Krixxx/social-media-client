import React, { useEffect } from 'react';

import { useDataContext } from '../context/dataContext';
import { Post, PostSkeleton } from '../components';

import Grid from '@mui/material/Grid';

const PostContainer = () => {
  const { isLoadingData, getAllPosts, posts } = useDataContext();

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <Grid item sm={8} xs={12}>
      {isLoadingData ? (
        <PostSkeleton />
      ) : posts ? (
        posts.map((post, index) => {
          return <Post key={post._id} post={post} />;
        })
      ) : (
        <p>Loading...</p>
      )}
    </Grid>
  );
};

export default PostContainer;
