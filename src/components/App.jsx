import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../services/api';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { AppStyled, ErrorStyled } from './App.styled';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchName: '',
    page: 1,
    items: [],
    openModalObject: null,
    status: 'idle',
    isFullImage: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchName, page } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.searchName !== this.state.searchName
    ) {
      this.setState({ status: 'pending' });

      try {
        getImages(searchName, page).then(({ totalImage, images }) => {
          this.setState(pS => {
            if (totalImage === 0) {
              Notify.failure('Nothing found');
              return {
                status: 'rejected',
              };
            }

            if (totalImage === pS.items.length) {
              return {
                isFullImage: true,
                items: [...pS.items, ...images],
                status: 'resolved',
              };
            }

            return {
              items: [...pS.items, ...images],
              status: 'resolved',
            };
          });
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  hendeleSubmitSearchForm = ({ name }) => {
    const validName = name.trim();
    if (validName === '') {
      Notify.failure('The search field must be filled');
      return;
    }

    if (this.state.searchName === validName) {
      return;
    }

    this.setState({
      searchName: validName,
      page: 1,
      items: [],
      openModalObject: null,
      status: 'idle',
      isFullImage: false,
    });
  };

  hendleOpenModal = (url, alt) => {
    const modalObject = {
      url,
      alt,
    };
    this.setState({ openModalObject: modalObject });
  };

  closeModal = () => {
    this.setState({ openModalObject: null });
  };

  loadMore = () => {
    this.setState(pS => ({
      page: pS.page + 1,
    }));
  };

  render() {
    const { items, openModalObject, status, isFullImage } = this.state;

    if (status === 'idle') {
      return (
        <AppStyled>
          <Searchbar onSubmit={this.hendeleSubmitSearchForm} />
        </AppStyled>
      );
    }

    if (status === 'pending') {
      return (
        <AppStyled>
          <Searchbar onSubmit={this.hendeleSubmitSearchForm} />

          <ImageGallery>
            <ImageGalleryItem items={items} onClick={this.hendleOpenModal} />
          </ImageGallery>

          <Loader />

          {items.length !== 0 && !isFullImage && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
        </AppStyled>
      );
    }

    if (status === 'resolved') {
      return (
        <AppStyled>
          <Searchbar onSubmit={this.hendeleSubmitSearchForm} />

          <ImageGallery>
            <ImageGalleryItem items={items} onClick={this.hendleOpenModal} />
          </ImageGallery>

          {openModalObject && (
            <Modal image={openModalObject} closeModal={this.closeModal} />
          )}

          {items.length !== 0 && !isFullImage && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
          {isFullImage && <ErrorStyled>These are all images</ErrorStyled>}
        </AppStyled>
      );
    }

    if (status === 'rejected') {
      return (
        <AppStyled>
          <Searchbar onSubmit={this.hendeleSubmitSearchForm} />
          <ErrorStyled>Try again ...</ErrorStyled>
        </AppStyled>
      );
    }
  }
}
