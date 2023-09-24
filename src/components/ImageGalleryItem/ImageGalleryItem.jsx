import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  largeImageURL,
  webformatURL,
  tags,
  onOpenModal,
}) => {
  return (
    <li
      className={css.galleryItem}
      onClick={() => onOpenModal(largeImageURL, tags)}
    >
      <img src={webformatURL} alt={tags} className={css.image} />
    </li>
  );
};

export default ImageGalleryItem;
