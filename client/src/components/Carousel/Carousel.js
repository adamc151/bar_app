import React from "react";
import Slider from "react-slick";
import ListItem from "../List/ListItem";
import "../List/ListItem.css";
import "./Carousel.css"

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className="nextArrow" onClick={onClick} />;
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className="prevArrow" onClick={onClick} />;
}

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
            onClick={() => this.state.slideIndex != i && this.slick.slickGoTo(i)}
            onHover={this.props.onHover}
            className='carouselCard'
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
      afterChange: () => this.props.onSwipe(this.props.data[this.state.slideIndex]),
      beforeChange: (current, next) => this.setState({ slideIndex: next }),
      arrows: false,
      className: "center",
      centerMode: true,
      centerPadding: "60px"
    };
    return <Slider ref={node => this.slick = node} {...settings} onSwipe={(x)=> { console.log('x', x); }}>{this.renderList()}</Slider>;
  }
}

export default Carousel;
