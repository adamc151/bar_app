import React from "react";
import "./Image.css";
import ViewportObserver from '../ViewportObserver/ViewportObserver';

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

    // return <img src={src} className={`img ${imageLoaded} ${className}`} alt="" onLoad={() => { this.setState({ imageLoading: false }) }}/>;

    return(
      <div className={`imgSkeleton ${className}`} >
        <ViewportObserver>
          {(intersected) => {
            console.log('yooo intersected', intersected);


            return (<img
              src={intersected ? src : ''}
              className={`img ${imageLoaded} ${className}`}
              alt=""
              onLoad={() => { this.setState({ imageLoading: false }) }}
            />);

          }}
        </ViewportObserver>
      </div>
    );

  }
}

export default Image;
