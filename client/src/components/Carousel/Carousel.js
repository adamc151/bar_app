import React from "react";
import Slider from "react-slick";
import ListItem from "../List/ListItem";
import "../List/ListItem.css";
import "./Carousel.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
      updateCount: 0,
      slides: props.data,
      controlledSlide: null
    };
  }

  componentDidUpdate() {
    if (this.props.controlledSlide !== this.state.controlledSlide) {
      this.slick.slickGoTo(this.props.controlledSlide);
      this.setState({ controlledSlide: this.props.controlledSlide });
    }
  }

  renderList() {
    if (!this.props.data) return null;

    return this.props.data.map((data, i) => {
      return (
        <ListItem
          key={i}
          index={i}
          data={data}
          onClick={() => this.state.slideIndex !== i && this.slick.slickGoTo(i)}
          onHover={this.props.onHover}
          className="carouselCard"
        />
      );
    });
  }

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: () =>
        this.props.onSwipe(this.props.data[this.state.slideIndex]),
      beforeChange: (current, next) => this.setState({ slideIndex: next }),
      arrows: false,
      className: "center",
      centerMode: true,
      centerPadding: "20px"
    };
    return (
      <Slider
        ref={node => (this.slick = node)}
        {...settings}
        onSwipe={x => {
          console.log("x", x);
        }}
      >
        {this.renderList()}
      </Slider>
    );
  }
}

export default Carousel;
