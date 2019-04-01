import React from "react";
import Slider from "react-slick";
import ListItem from "../List/ListItem";
import "../List/ListItem.css";
import "./Carousel.css"

class Carousel extends React.Component {
  renderList() {
    if (!this.props.data) return null;

    return this.props.data.map((data, i) => {
      return (
        <ListItem
          key={i}
          index={i}
          data={data}
          onClick={this.props.onClick}
          onHover={this.props.onHover}
        />
      );
    });
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return <Slider {...settings}>{this.renderList()}</Slider>;
  }
}

export default Carousel;
