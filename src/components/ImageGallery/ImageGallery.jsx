import { ImageGalleryItem } from 'components/ImageGalleryItem';

import { GalleryContainer } from './imageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <GalleryContainer>
      {images.map(({ id, webformatURL }) => {
        return <ImageGalleryItem key={id} galleryFormat={webformatURL} />;
      })}
    </GalleryContainer>
  );
};
