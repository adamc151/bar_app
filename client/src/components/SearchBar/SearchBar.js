import React from 'react';
import './SearchBar.css';

export const SearchBar = (props) => {

  return (
    <div className='container'>
    <input className='searchbar' ref={props.getNode} onChange={props.onChange} placeHolder='Search' />
    <span className='line' />
    </div>
  )
}

export default SearchBar;
