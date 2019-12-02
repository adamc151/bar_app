import React from "react";
import "./Image.css";

class Image extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imageLoading: true
    }
  }

  render() {

    const { src, className } = this.props;
    const imageLoaded = !this.state.imageLoading ? 'imgLoaded' : '';

    return(
      <div className={`imgSkeleton ${className}`} >
        <img src={src} className={`img ${imageLoaded} ${className}`} alt="" onLoad={() => { this.setState({ imageLoading: false }) }}/>
      </div>
    );

  }
}

export default Image;
