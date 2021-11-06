import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Post = ({ post }) => {
  dayjs.extend(relativeTime);

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
  return (
    <Wrapper>
      <Card className='card'>
        <div className='img-container'>
          <img src={`http://localhost:5000/${image}`} />
        </div>
        <CardContent className='content'>
          <Typography
            className='handle'
            variant='h5'
            // component={Link}
            // to={`/users/${createdBy}`}
          >
            {userHandle}
          </Typography>
          <Typography className='date' variant='body2'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{message}</Typography>
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
  /* .image {
    min-width: 200px;
    object-fit: cover;
  } */
  .img-container {
    width: 200px;
  }
  .img-container img {
    width: 100%;
    object-fit: cover;
  }
  .content {
    padding: 25px;
  }
  .handle {
    color: hsl(209, 61%, 16%);
  }
  .date {
    color: hsl(210, 31%, 80%);
  }
`;

export default Post;
