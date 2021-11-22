import React, { useState, useEffect } from 'react';

import { useDataContext } from '../context/dataContext';
import { Post, PostSkeleton, Pagination } from '../components';

import Grid from '@mui/material/Grid';

const PostContainer = () => {
  const { isLoadingData, getAllPosts, posts, postCount } = useDataContext();
  const [page, setPage] = useState(1);
  // const [paginatedPosts, setPaginatedPosts] = useState([]);
  const itemsPerPage = 3;
  const maxPages = Math.ceil(postCount / itemsPerPage);

  useEffect(() => {
    getAllPosts(page, itemsPerPage);
  }, [getAllPosts, page]);

  const handlePage = (index) => {
    setPage(index);
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;

      if (prevPage < 1) {
        prevPage = maxPages;
      }

      return prevPage;
    });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;

      if (nextPage > maxPages) {
        nextPage = 1;
      }

      return nextPage;
    });
  };

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
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        handlePage={handlePage}
        page={page}
        maxPages={maxPages}
      />
    </Grid>
  );
};

export default PostContainer;
