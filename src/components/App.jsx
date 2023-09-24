import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getPhoto } from 'api/api';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import MyModal from './Modal/MyModal';
import Button from './Button/Button';
import Notiflix from 'notiflix';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import StartPage from './StartPage/StartPage';
Notiflix.Notify.init({
  width: '280px',
  position: 'top',
  distance: '60px',
  opacity: 1,
});

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await getPhoto(query, page);
        setError(null);
        if (hits.length === 0) {
          return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setTotal(totalHits);
        if (page === 1) {
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    query && fetchImages();
  }, [query, page]);

  const onHandleSubmit = value => {
    if (value === query) {
      return Notiflix.Notify.info('You have already entered this value');
    }
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const onOpenModal = (largeImageURL, tags) => {
    // this.setState({showModal: true, largeImageURL: largeImageURL, tags: tags})
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTags('');
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const allPage = total / images.length;
  // loadMore: this.state.page < Math.ceil(totalHits / 12 )
  return (
    <>
      <Searchbar onSubmit={onHandleSubmit} />
      {query === '' && <StartPage />}

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && !error && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}
      {allPage > 1 && !isLoading && images.length > 0 && (
        <Button onClick={onLoadMore} />
      )}

      <MyModal
        largeImageURL={largeImageURL}
        tags={tags}
        isOpenModal={showModal}
        isCloseModal={onCloseModal}
      />
    </>
  );
};

export default App;
