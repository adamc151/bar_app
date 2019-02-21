import React from 'react';
import './SearchBar.css';

export const SearchBar = (props) => {

  return (
    <input className='searchbar' ref={props.getNode} onChange={props.onChange} />
  )
}

export default SearchBar;
