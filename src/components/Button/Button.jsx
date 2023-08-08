import { ButtonLoadMore, ButtonContainer } from './button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonContainer>
      <ButtonLoadMore type="button" onClick={onClick}>
        Load More
      </ButtonLoadMore>
    </ButtonContainer>
  );
};
