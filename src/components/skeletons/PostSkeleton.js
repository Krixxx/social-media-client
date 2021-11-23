import React from 'react';
import styled from 'styled-components';

import NoImg from '../../assets/images/no_image.png';

// MUI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const PostSkeleton = ({ itemsPerPage }) => {
  let items = itemsPerPage;

  //if items per page are more than 5, we show 5 skeletons for loading.
  //or if there are no props given, then show 5 skeletons.
  if (items === 0 || items > 5) {
    items = 5;
  }

  const content = Array.from({ length: items }).map((item, index) => (
    <Card className='card' key={index}>
      <CardMedia className='cover' image={NoImg} />
      <CardContent className='card-content'>
        <div className='handle' />
        <div className='date' />
        <div className='full-line' />
        <div className='full-line' />
        <div className='half-line' />
      </CardContent>
    </Card>
  ));

  return <Wrapper>{content}</Wrapper>;
};

const Wrapper = styled.div`
  .card {
    max-height: 156px;
    display: flex;
    margin-bottom: 10px;
  }
  .card-content {
    width: 100%;
    flex-direction: column;
    padding: 25px;
  }
  .cover {
    width: 150px;
    max-height: 150px;
    padding: 10px;
  }
  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .handle {
    width: 60px;
    height: 18px;
    background-color: #1976d2;
    margin-bottom: 7px;
  }
  .date {
    height: 14px;
    width: 100px;
    background-color: hsl(210, 31%, 80%);
    margin-bottom: 10px;
  }
  .full-line {
    height: 15px;
    width: 90%;
    margin-bottom: 5px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .half-line {
    height: 15px;
    width: 50%;
    margin-bottom: 5px;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

export default PostSkeleton;
