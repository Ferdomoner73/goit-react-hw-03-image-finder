import {
  GalleryItemContainer,
  GalleryItemImg,
} from './imageGalleryItem.styled';

export const ImageGalleryItem = ({ galleryFormat }) => {
  return (
    <GalleryItemContainer>
      <GalleryItemImg src={galleryFormat} alt="" loading="lazy" />
    </GalleryItemContainer>
  );
};
