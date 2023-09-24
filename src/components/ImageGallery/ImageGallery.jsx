import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
          tags={tags}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
