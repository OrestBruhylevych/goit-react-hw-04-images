import { Component } from "react";
import {OverlayStyled, ModalStyled } from './Modal.styled';




export class Modal extends Component {

    componentDidMount() {
        document.addEventListener('keydown', this.addLisetenerEsc);
    }

    componentWillUnmount() {
    document.removeEventListener('keydown', this.addLisetenerEsc);
  }

    addLisetenerEsc = (e) => {
        const { closeModal } = this.props;
        if (e.code === "Escape") { closeModal() }; 
    }

    onOverlayClick = (e) => {
        const { closeModal } = this.props;
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }
    
    render() {
        const { image } = this.props;
        const { url, alt } = image;

        return (
            <OverlayStyled className="overlay" onClick={this.onOverlayClick}>
                <ModalStyled className="modal">
                    <img src={url} alt={alt} />
                </ModalStyled>
            </OverlayStyled>    
        );
    }
    
};
