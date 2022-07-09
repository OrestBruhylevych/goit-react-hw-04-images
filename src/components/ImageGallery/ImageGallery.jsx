import { Component } from "react";
import { ImageGalleryStyled} from './ImageGallery.styled';



export class ImageGallery extends Component {
  
  
  render() {
    return (
      <ImageGalleryStyled className="gallery">
          {this.props.children}
      </ImageGalleryStyled>
    );
  }
};
