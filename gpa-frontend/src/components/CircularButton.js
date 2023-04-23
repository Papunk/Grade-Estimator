import React from 'react';
import styled from 'styled-components';


const CircularButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: size;
  height: size;
  padding: 10px;
  cursor: pointer;
  border: none;
  outline: none;
`;

export default CircularButton;