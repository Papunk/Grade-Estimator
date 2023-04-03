import React from 'react';

const HStack = ({ children }) => {
  const stackStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={stackStyle}>
      {children}
    </div>
  );
};

export default HStack;
