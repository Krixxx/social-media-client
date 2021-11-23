import React, { useState, useEffect } from 'react';

import { useDataContext } from '../context/dataContext';
import { Post, PostSkeleton, Pagination } from '../components';

import Grid from '@mui/material/Grid';

const PostContainer = () => {
  //get data from dataContext()
  const { isLoadingData, getAllPosts, posts, postCount } = useDataContext();
  //set default page number 0
  const [page, setPage] = useState(0);
  //how many items per page we want to see
  const itemsPerPage = 5;
  //how many pages do we have
  const maxPages = Math.ceil(postCount / itemsPerPage);

  /**
   * get all posts, we need to pass page number and items per page
   */
  useEffect(() => {
    getAllPosts(page + 1, itemsPerPage);
  }, [getAllPosts, page]);

  //set page, which number was pressed
  const handlePage = (index) => {
    setPage(index);
  };

  //go to previous page
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;

      if (prevPage < 0) {
        prevPage = maxPages - 1;
      }

      return prevPage;
    });
  };

  //go to next page
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;

      if (nextPage > maxPages - 1) {
        nextPage = 0;
      }

      return nextPage;
    });
  };

  return (
    <Grid item sm={8} xs={12}>
      {isLoadingData ? (
        <PostSkeleton itemsPerPage={itemsPerPage} />
      ) : posts ? (
        posts.map((post, index) => {
          return <Post key={post._id} post={post} />;
        })
      ) : (
        <p>Loading...</p>
      )}
      {maxPages > 1 && (
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          handlePage={handlePage}
          page={page}
          maxPages={maxPages}
        />
      )}
    </Grid>
  );
};

export default PostContainer;
