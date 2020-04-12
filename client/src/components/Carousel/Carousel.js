import "../../setupTests.js";
import React from "react";
import Slider from "react-slick";
import "./Carousel.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
      controlledSlide: null,
    };
  }

  componentDidUpdate() {
    if (
      this.props.controlledSlide !== null &&
      this.props.controlledSlide !== this.state.controlledSlide
    ) {
      this.slick.slickGoTo(this.props.controlledSlide);
      this.setState({ controlledSlide: this.props.controlledSlide });
    }
  }

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: () => this.props.onSwipe(this.state.slideIndex),
      beforeChange: (current, next) => this.setState({ slideIndex: next }),
      arrows: false,
      className: "center",
      centerMode: true,
      centerPadding: "20px",
      initialSlide: this.props.initialSlide,
    };
    return (
      <Slider ref={(node) => (this.slick = node)} {...settings}>
        {this.props.children}
      </Slider>
    );
  }
}

export default Carousel;
