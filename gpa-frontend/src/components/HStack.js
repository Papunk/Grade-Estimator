import React from 'react';
import styled from 'styled-components';

const HStack = ({ children }) => {
  return (
    <StackStyle>
      {children}
    </StackStyle>
  );
};


const StackStyle = styled.div`
  display: flex;
  gap: 10pt;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default HStack;
