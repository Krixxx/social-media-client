import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
        <CardMedia
          className='image'
          image={`http://localhost:5000/${image}`}
          title='Profile image'
        />
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
  .image {
    min-width: 200px;
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
