import { PureComponent } from 'react';

import { Container } from './app.styled';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';

import { fetchData } from '../api/search';

const INITIAL_VALUES = {
  searchValue: '',
  page: 1,
  images: [],
  status: 'tofind',
};

export class App extends PureComponent {
  state = {
    ...INITIAL_VALUES,
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page, images } = this.state;

    if (prevState.searchValue !== searchValue && searchValue !== '') {
      if (page === 1) {
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
          }));
        });
      }
    }
  }

  onSubmit = value => {
    if (value === this.state.searchValue) return;
    this.setState({ searchValue: value.searchField, page: 1, images: [] });
  };

  handleClickLoadMore = async () => {
    const { searchValue, page } = this.state;

    this.setState(prevState => ({
      page: (prevState.page += 1),
    }));
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
      }));
    });
  };

  render() {
    const { images } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
        {images.length > 0 && <Button onClick={this.handleClickLoadMore} />}
      </Container>
    );
  }
}
