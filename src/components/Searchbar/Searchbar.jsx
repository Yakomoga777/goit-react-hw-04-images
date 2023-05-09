import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

import React, { Component, useState } from 'react';
import {
  StyleSearchbar,
  StyleSearchForm,
  StyleButton,
  StyledButtonLable,
  StyleSerchInput,
} from './Searchbar.styled';

export const Searchbar = ({
  items,
  showLoadMoreBtn,
  onPicture,
  onButtonSubmit,
  onLoadMoreClick,
}) => {
  //State
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = evt => {
    setSearchQuery(evt.target.value);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    const search = searchQuery.trim();
    onButtonSubmit(search);
    console.log(evt);
  };

  const onClickLoadMore = searchQuery => {
    onLoadMoreClick(searchQuery);
  };

  return (
    <>
      <StyleSearchbar>
        <StyleSearchForm onSubmit={onSubmit}>
          <StyleButton type="submit">
            <StyledButtonLable>Search</StyledButtonLable>
          </StyleButton>

          <StyleSerchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
            value={searchQuery}
          />
        </StyleSearchForm>
      </StyleSearchbar>

      <ImageGallery items={items} onPicture={onPicture} />
      {showLoadMoreBtn && <Button onClick={onClickLoadMore} />}
    </>
  );
};

// export class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleInputChange = evt => {
//     this.setState({ searchQuery: evt.target.value });
//   };

//   onSubmit = evt => {
//     const searchQuery = this.state.searchQuery.trim();

//     evt.preventDefault();
//     this.props.onSubmit(searchQuery);
//   };

//   onLoadMoreClick = searchQuery => {
//     searchQuery = this.state.searchQuery;
//     console.log(searchQuery);

//     this.props.onLoadMoreClick(searchQuery);
//   };

//   render() {
//     const { search } = this.state;

//     const { items, showLoadMoreBtn, onPicture } = this.props;

//     return (
//       <>
//         <StyleSearchbar>
//           <StyleSearchForm onSubmit={this.onSubmit}>
//             <StyleButton type="submit">
//               <StyledButtonLable>Search</StyledButtonLable>
//             </StyleButton>

//             <StyleSerchInput
//               type="text"
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//               onChange={this.handleInputChange}
//               value={search}
//             />
//           </StyleSearchForm>
//         </StyleSearchbar>

//         <ImageGallery items={items} onPicture={onPicture} />
//         {showLoadMoreBtn && <Button onClick={this.onLoadMoreClick} />}
//       </>
//     );
//   }
// }
