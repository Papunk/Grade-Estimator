import React, { useState } from 'react';


const Modal = ({ onClose, children }) => {
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
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '80%',
          maxWidth: '600px',
          backgroundColor: '#33405b',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{fontSize: '12pt', position: 'absolute', top: '16px', left: '16px', cursor: 'pointer', color: '#ff5136'}} onClick={onClose}>Close</div>
        {children}
      </div>
    </div>
  );
};

const ExpandableModal = ({trigger, children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div onClick={handleOpenModal}>{trigger}</div>
      {showModal && <Modal onClose={handleCloseModal}>{children}</Modal>}
    </>
  );
};

export default ExpandableModal;
