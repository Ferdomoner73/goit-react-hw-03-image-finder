import { PureComponent } from 'react';

import { css, Global } from '@emotion/react';
import modernNormalize from 'modern-normalize';

import { Container } from './app.styled';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

import { fetchData } from '../api/search';

const INITIAL_VALUES = {
  searchValue: '',
  page: 1,
  images: [],
  isLoading: false,
};

export class App extends PureComponent {
  state = {
    ...INITIAL_VALUES,
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue } = this.state;
    if (
      prevState.searchValue.trim() !== searchValue.trim() &&
      searchValue !== ''
    ) {
      this.setState({ images: [] });
      this.saveData();
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  saveData = () => {
    const { searchValue, page } = this.state;

    fetchData(searchValue, page).then(response => {
      const filteredImages = response.hits.map(obj => {
        return {
          id: obj.id,
          webformatURL: obj.webformatURL,
          largeImageURL: obj.largeImageURL,
        };
      });
      this.setState(prevState => ({
        images: [...prevState.images, ...filteredImages],
        page: (prevState.page += 1),
        isLoading: false,
      }));
    });
  };

  onSubmit = value => {
    this.setState({
      searchValue: value.searchField,
      page: 1,
      isLoading: true,
    });
  };

  handleClickLoadMore = async () => {
    this.setState({ isLoading: true });
    this.saveData();
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <Container>
        <Global
          styles={css`
            ${modernNormalize}
          `}
        />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
        {images.length > 0 && isLoading === false && (
          <Button onClick={this.handleClickLoadMore} />
        )}
        {isLoading === true && <Loader />}
      </Container>
    );
  }
}
