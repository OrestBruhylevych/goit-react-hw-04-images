import { Component } from "react";



export class ImageGallery extends Component {
  
  
  render() {
    return (<ul className="gallery">
      {this.props.children}
    </ul>);
  }
};
