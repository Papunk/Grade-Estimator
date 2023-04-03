import React from 'react';

const PillButton = ({ text, backgroundColor, textColor, onClick }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || '#4ea0d9',
    color: textColor || 'white',
    border: 'none',
    borderRadius: '999px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12pt',
    outline: 'none',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default PillButton;
