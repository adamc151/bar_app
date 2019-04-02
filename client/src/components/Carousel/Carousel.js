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
        <div className='carouselCard' >
          <ListItem
            key={i}
            index={i}
            data={data}
            onClick={this.props.onClick}
            onHover={this.props.onHover}
          />
        </div>
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
      afterChange: () => this.props.onSwipe(this.props.data[this.state.slideIndex]),
      beforeChange: (current, next) => this.setState({ slideIndex: next }),
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      className: "center",
      centerMode: true,
      centerPadding: "60px"
    };
    return <Slider {...settings} onSwipe={(x)=> { console.log('x', x); }}>{this.renderList()}</Slider>;
  }
}

export default Carousel;
