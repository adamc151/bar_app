import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  render() {
    const {
      onChange,
      getNode,
      onfocusin,
      onfocusout,
      onClickButton,
      fetchingUserLocation
    } = this.props;

    const searchbarButtonModifier = fetchingUserLocation ? 'searchbarButtonLoading' : '';

    return (
      <div className="searchBarWrapper">
        <input
          ref={node => {
            this.searchBar = node;
            getNode(node);
          }}
          className="searchbar searchBarLanding"
          onChange={onChange}
          placeholder="Search..."
          onFocus={onfocusin}
          onBlur={onfocusout}
          id="keyword"
          onKeyDown={event => {
            if (event.keyCode == 13) {
              this.searchBar.blur();
              return false;
            }
          }}
        />
        <div className={"searchbarButton " + searchbarButtonModifier} onClick={onClickButton} />
        <span className="line" />
      </div>
    );
  }
}

export default SearchBar;
