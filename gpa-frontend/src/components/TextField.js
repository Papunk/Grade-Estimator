import React from 'react';

const TextField = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        borderRadius: '5px',
        fontSize: '12pt', 
        padding: '10px',
        border: '1px solid #d2d2d2',
        backgroundColor: '#f2f2f2',
        color: '#333',
      }}
    />
  );
};

export default TextField;