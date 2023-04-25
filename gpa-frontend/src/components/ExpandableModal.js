import React, { useState } from 'react';


const ExpandableModal = ({ onClose, children }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#33405b',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{fontSize: '12pt', fontWeight: 'bold', position: 'absolute', top: '16px', left: '16px', cursor: 'pointer', color: '#ff6b60'}} onClick={onClose}>Close</div>
        {children}
      </div>
    </div>
  );
};

export default ExpandableModal;
