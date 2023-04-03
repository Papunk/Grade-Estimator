import React from 'react';

const CircularButton = ({ src, color, size, onClick }) => {
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
    borderRadius: '50%',
    width: size,
    height: size,
    padding: '10px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      <img src={src} alt="button" style={{ width: '100%', height: '100%' }} />
    </button>
  );
};

export default CircularButton;
