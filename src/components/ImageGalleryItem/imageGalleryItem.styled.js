import styled from "@emotion/styled";

export const GalleryItemContainer = styled.li`
    width: calc(((100% - 1rem * 3)/4));
    height: calc(((100% - 1rem * 3)/3));
`

export const GalleryItemImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`