export const ImageGalleryItem = ({ items }) => {
    const itemsImages = items.map(item => {
        const {id, webformatURL, tags } = item;

        return (
            <li key={id} className="gallery-item">
                <img src={webformatURL} alt={tags} />
            </li>
        )
   })

    return (
        <>
            {itemsImages}
        </>
    );
    
};
