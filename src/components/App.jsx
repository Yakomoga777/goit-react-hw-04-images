import React, { useState, useEffect } from 'react';
import { StyledApp } from './AppStyled';
import { Searchbar } from './Searchbar/Searchbar';

import { fetchImages } from 'services/api';
import { GlobalStyle } from './Styles/GlobalStyle/GlobalStyle';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const perPage = 12;

//* render > didMount > getItem > setState > update > render > didUpdate > setItem

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [showLoadMoreBtn, setShowLoadMoreBtne] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('Did Mount');
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log('Did Update');

    if (searchQuery) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetchImages(searchQuery, page, perPage);
          setImages(response.data.hits);

          // Перевірка на наявність кнопки LoadMore
          if (response.data.hits.length === perPage) {
            setShowLoadMoreBtne(true);
          } else setShowLoadMoreBtne(false);

          // Пагінація нанатисканні кнопки LoadMore
          if (page > 1) {
            setImages(prevImages => [...images, ...prevImages]);
            return;
          }
        } catch (error) {
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      };

      fetchData();
    }
  }, [searchQuery, page]);

  const onSubmit = search => {
    setSearchQuery(search);

    setPage(1);
  };

  const onLoadMoreClick = async search => {
    setPage(prevPage => prevPage + 1);
  };

  const onPicture = index => {
    const picture = images.filter(image => image.id === +index);

    toogleModal();
    setLargeImageURL(picture[0].largeImageURL);
  };

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <StyledApp>
      {showModal && (
        <Modal onCloseModal={toogleModal}>
          {<img src={largeImageURL} alt={''}></img>}
        </Modal>
      )}
      <GlobalStyle />
      <Searchbar
        onButtonSubmit={onSubmit}
        onLoadMoreClick={onLoadMoreClick}
        items={images}
        showLoadMoreBtn={showLoadMoreBtn}
        onPicture={onPicture}
      />
      {isLoading && <Loader />}
    </StyledApp>
  );
};

// export class App extends Component {
//   // state = {
//   //   images: [],
//   //   page: 1,
//   //   isLoading: false,
//   //   error: null,
//   //   showLoadMoreBtn: false,
//   //   showModal: false,
//   //   largeImageURL: '',
//   //   searchQuery: '',
//   // };

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchQuery, page } = this.state;

//     if (prevState.searchQuery !== searchQuery) {
//       try {
//         this.setState({ isLoading: true });

//         const response = await fetchImages(searchQuery, page, perPage);
//         this.setState({ images: response.data.hits });

//         // Перевірка на кнопку
//         if (response.data.totalHits > perPage) {
//           this.setState({
//             showLoadMoreBtn: true,
//           });
//         }
//       } catch (error) {
//       } finally {
//         setTimeout(() => {
//           this.setState({ isLoading: false });
//         }, 1000);
//       }
//     }
//     if (prevState.searchQuery === searchQuery && prevState.page !== page) {
//       try {
//         this.setState({ isLoading: true });

//         const response = await fetchImages(searchQuery, page, perPage);
//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.data.hits],
//           page: this.state.page,
//         }));
//         console.log(response);

//         // Перевірка на кнопку
//         if (response.data.totalHits > this.state.page * perPage) {
//           this.setState({
//             showLoadMoreBtn: true,
//           });
//         } else {
//           this.setState({
//             showLoadMoreBtn: false,
//           });
//         }
//       } catch (error) {
//       } finally {
//         setTimeout(() => {
//           this.setState({ isLoading: false });
//         }, 1000);
//       }

//       console.log('Апдейт PAGE');
//     } else if (
//       prevState.searchQuery !== searchQuery &&
//       prevState.page !== page
//     ) {
//       console.log('Привіт');
//     }
//   }

//   // onSubmit = search => {
//   //   this.setState({ searchQuery: search, page: 1 });
//   // };

//   onLoadMoreClick = async search => {
//     console.log(search);
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   onPicture = index => {
//     console.log(index);

//     const { images } = this.state;
//     const picture = images.filter(image => image.id === +index);

//     this.toogleModal();
//     this.setState({ largeImageURL: picture[0].largeImageURL });
//   };

//   toogleModal = () => {
//     this.setState(prevState => ({ showModal: !prevState.showModal }));
//   };

//   render() {
//     const { images, isLoading, showLoadMoreBtn, showModal, largeImageURL } =
//       this.state;

//     return (
//       <StyledApp>
//         {showModal && (
//           <Modal onCloseModal={this.toogleModal}>
//             {<img src={largeImageURL} alt={this.alt}></img>}
//           </Modal>
//         )}
//         <GlobalStyle />
//         <Searchbar
//           onButtonSubmit={this.onSubmit}
//           onLoadMoreClick={this.onLoadMoreClick}
//           items={images}
//           showLoadMoreBtn={showLoadMoreBtn}
//           onPicture={this.onPicture}
//         />
//         {isLoading && <Loader />}
//       </StyledApp>
//     );
//   }
// }
