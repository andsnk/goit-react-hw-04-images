import { Component } from 'react';
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

class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    error: null,
    total: 0,
    largeImageURL: '',
    tags: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await getPhoto(query, page);
      this.setState({ error: null });
      if (hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
        hasLoadedImages: true,
      }));
      if (page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandleSubmit = value => {
    if (value === this.state.query) {
      return Notiflix.Notify.info('You have already entered this value');
    }
    this.setState({ query: value, page: 1, images: [] });
  };

  onOpenModal = (largeImageURL, tags) => {
    console.log(largeImageURL, tags);
    // this.setState({showModal: true, largeImageURL: largeImageURL, tags: tags})
    this.setState({ showModal: true, largeImageURL, tags });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '', tags: '' });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      images,
      isLoading,
      error,
      total,
      largeImageURL,
      tags,
      showModal,
      query,
    } = this.state;
    const allPage = total / images.length;
    // loadMore: this.state.page < Math.ceil(totalHits / 12 )
    return (
      <>
        <Searchbar onSubmit={this.onHandleSubmit} />
        {query === '' && <StartPage />}

        {isLoading && <Loader />}
        {error && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {allPage > 1 && !isLoading && images.length > 0 && (
          <Button onClick={this.onLoadMore} />
        )}

        <MyModal
          largeImageURL={largeImageURL}
          tags={tags}
          isOpenModal={showModal}
          isCloseModal={this.onCloseModal}
        />
      </>
    );
  }
}

export default App;
