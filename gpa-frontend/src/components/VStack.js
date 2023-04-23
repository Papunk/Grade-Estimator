import React from 'react';
import styled from 'styled-components';

const VStack = ({ children }) => {
  return (
    <StackStyle>
      {children}
    </StackStyle>
  );
};


const StackStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default VStack;
