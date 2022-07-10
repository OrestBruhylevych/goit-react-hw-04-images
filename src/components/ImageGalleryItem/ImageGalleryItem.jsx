import PropTypes from 'prop-types';

import { ImageGalleryItemStyled } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ items, onClick }) => {
  const itemsImages = items.map(item => {
    const { id, webformatURL, tags, largeImageURL } = item;

    return (
      <ImageGalleryItemStyled
        key={id}
        onClick={() => onClick(largeImageURL, tags)}
        className="gallery-item"
      >
        <img src={webformatURL} alt={tags} />
      </ImageGalleryItemStyled>
    );
  });

  return <>{itemsImages}</>;
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape),
};
