import React from "react";
import "./SearchBar.css";

export const SearchBar = props => {
  return (
    <div className="searchBarWrapper">
      <input
        className="searchbar"
        ref={props.getNode}
        onChange={props.onChange}
        placeholder="Search..."
      />
      <div className="searchbarButton" onClick={props.onClickButton} />
      <span className="line" />
    </div>
  );
};

export default SearchBar;
