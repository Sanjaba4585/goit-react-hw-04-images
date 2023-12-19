import { SearchBar } from 'components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import * as api from '../api/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/ErrorMessage/Error';
import Notiflix from 'notiflix';
import { Modal } from 'components/Modal/Modal';

import React from 'react';

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [q, setq] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!q) {
      return;
    }
    const getApi = async () => {
      setLoading(true);
      try {
        const data = await api.getImages(q, page);

        if (data.hits === 0) {
          Notiflix.Notify.warning(
            `There is no results upon your ${q}, please try again...`
          );
          return;
        }
        const normalizedImages = api.normalizedImages(data.hits);
        setLoading(false);
        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setResult(page >= Math.ceil(data.totalHits / 12));
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (q !== '') {
      getApi();
    }
  }, [q, page]);
  // componentDidUpdate(prevProps, prevState) {
  //   const { q, page } = this.state;
  //   if (prevState.q !== q || prevState.page !== page) {
  //     this.getApi(q, page);
  //   }
  // }

  const loadingButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlSubmit = value => {
    if (q === value) {
      return;
    }
    setq(value);
    setPage(1);
    setImages([]);
    setResult(0);
    setError(null);

    // this.setState({ q: value, page: 1, images: [], result: 0, error: null });
  };

  const onModalOpen = data => {
    setLargeImageURL(data);
    setIsOpen(true);
  };

  const onModalClose = data => {
    setIsOpen(false);
    setLargeImageURL(data);
  };

  return (
    <div>
      <SearchBar onSubmit={handlSubmit} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onModalOpen={onModalOpen} />
      )}
      {error && <ErrorMessage />}
      {!loading && images.length > 0 && !result && (
        <Button loadingButton={loadingButton} />
      )}
      {isOpen && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
};

export default App;

//   render() {
//     const { images, result, loading, error, modal } = this.state;
//     return (
//       <div>
//         <SearchBar onSubmit={this.handlSubmit} />
//         {loading && <Loader />}
//         {images.length > 0 && (
//           <ImageGallery images={images} onModalOpen={this.onModalOpen} />
//         )}
//         {error && <ErrorMessage />}
//         {result > images.length && (
//           <Button loadingButton={this.loadingButton} />
//         )}
//         {modal.isOpen && (
//           <Modal
//             largeImageURL={this.state.modal.largeImageURL}
//             onModalClose={this.onModalClose}
//           />
//         )}
//       </div>
//     );
//   }
// }
