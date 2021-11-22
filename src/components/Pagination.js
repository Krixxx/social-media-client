import React from 'react';
import styled from 'styled-components';

const Pagination = ({ prevPage, nextPage, handlePage, page, maxPages }) => {
  return (
    <Wrapper>
      <div className='btn-container'></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

export default Pagination;
