import React from 'react';
import Modal from 'react-modal';
import customStyles from './MyModalStyle';

Modal.setAppElement('#root');

const MyModal = ({ largeImageURL, tags, isOpenModal, isCloseModal }) => {
  return (
    console.log(largeImageURL),
    (
      <Modal
        isOpen={isOpenModal}
        onRequestClose={isCloseModal}
        style={customStyles}
      >
        <img
          src={largeImageURL}
          alt={tags}
          style={{ width: '100%' }}
          onClick={isCloseModal}
        />
      </Modal>
    )
  );
};

export default MyModal;
