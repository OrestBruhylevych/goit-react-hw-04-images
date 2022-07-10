import { ImageGalleryStyled } from './ImageGallery.styled';

export const ImageGallery = ({ children }) => {
  return (
    <ImageGalleryStyled className="gallery">{children}</ImageGalleryStyled>
  );
};
