import React from "react";
import Slider from "react-slick";
import ListItem from "../List/ListItem";
import "../List/ListItem.css";
import "./Carousel.css"

class Carousel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
      updateCount: 0,
      slides: props.data
    };
  }



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
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: () => this.props.data[0] && this.props.onSwipe(this.props.data[this.state.slideIndex]),
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };
    return <Slider {...settings} onSwipe={(x)=> { console.log('x', x); }}>{this.renderList()}</Slider>;
  }
}

export default Carousel;
