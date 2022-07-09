import { ImageGalleryItemStyled} from './ImageGalleryItem.styled'
 


export const ImageGalleryItem = ({ items }) => {
    const itemsImages = items.map(item => {
        const {id, webformatURL, tags } = item;

        return (
            <ImageGalleryItemStyled key={id} className="gallery-item">
                <img src={webformatURL} alt={tags} />
            </ImageGalleryItemStyled>
        )
   })

    return (
        <>
            {itemsImages}
        </>
    );
    
};
