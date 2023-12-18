import css from './Modal.module.css';
import React, { useEffect } from 'react';

export const Modal = ({ largeImageURL, onModalClose }) => {
  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  useEffect(() => {
    const onKeyDown = e => {
      if (e.keyCode === 27) {
        onModalClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onModalClose]);

  return (
    <div className={css.overlay} onClick={onOverlayClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
