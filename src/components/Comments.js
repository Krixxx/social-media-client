import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Comments = ({ comments }) => {
  return (
    <Wrapper>
      <Grid container>
        {comments.map((comment, index) => {
          const {
            // _id: commentId,
            message,
            createdAt,
            image: userImage,
            userHandle,
            userId,
          } = comment;

          return (
            <div key={createdAt}>
              <Grid item sm={12} className='grid-item'>
                <Grid container>
                  <Grid item sm={2} className='comment-img-container'>
                    <img
                      src={userImage}
                      alt='comment'
                      className='comment-image'
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className='comment-data'>
                      <Typography
                        variant='h5'
                        component={Link}
                        to={`/users/${userId}`}
                        color='primary'
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('H:mm, DD MMMM YYYY')}
                      </Typography>
                      <hr className='invisible-separator' />
                      <Typography variant='body1'>{message}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && <hr />}
            </div>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .grid-item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .comment-img-container {
    display: flex;
    align-items: center;
  }
  .comment-img-container img {
    /* max-height: 100%; */
    max-width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }
  .comment-data {
    margin-left: 20px;
  }
`;

export default Comments;
